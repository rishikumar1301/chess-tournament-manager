import sql from '$lib/server/db';

export async function getTournamentPlayerIds(
	tournamentId: number
): Promise<number[]> {

	const players = await sql<{ player_id: number }[]>`
		SELECT player_id
		FROM tournament_players
		WHERE tournament_id = ${tournamentId}
	`;
	console.log(players);


	return players.map((player) => player.player_id);
}

function shufflePlayers(playerIds: number[]): number[] {
	const shuffled = [...playerIds];

	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));

		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}

	return shuffled;
}

function createPairings(
	playerIds: number[],
	playedPairs: Set<string>
) {
	const available = [...playerIds];
	const pairings: {
		player1_id: number;
		player2_id: number | null;
	}[] = [];

	while (available.length > 1) {
		const player1 = available.shift()!;

		let opponentIndex = -1;

		for (let i = 0; i < available.length; i++) {
			const player2 = available[i];

			if (!playedPairs.has(`${player1}-${player2}`)) {
				opponentIndex = i;
				break;
			}
		}


		if (opponentIndex === -1) {
			opponentIndex = 0;
		}

		const player2 = available.splice(opponentIndex, 1)[0];

		pairings.push({
			player1_id: player1,
			player2_id: player2
		});
	}


	if (available.length === 1) {
		pairings.push({
			player1_id: available[0],
			player2_id: null
		});
	}

	return pairings;
}

export async function savePairings(
	tournamentId: number,
	round: number,
	pairings: { player1_id: number; player2_id: number | null }[]
) {
	for (const pairing of pairings) {
		await sql`
			INSERT INTO matches (
				tournament_id,
				round,
				player1_id,
				player2_id,
				winner_id
			)
			VALUES (
				${tournamentId},
				${round},
				${pairing.player1_id},
				${pairing.player2_id},
				${pairing.player2_id === null ? pairing.player1_id : null}
			)
		`;
	}
}

export async function generateRound(
	tournamentId: number,

) {
	const completed = await isCurrentRoundComplete(tournamentId);

	if (!completed) {
		throw new Error(
			'Complete the current round before generating the next round.'
		);
	}
	const playerIds = await getTournamentPlayerIds(tournamentId);

	if (playerIds.length < 2) {
		throw new Error('At least 2 players are required.');
	}

	const shuffled = shufflePlayers(playerIds);

	const playedPairs = await getPlayedPairs(tournamentId);


	const pairings = createPairings(
		shuffled,
		playedPairs
	);

	const nextRound = await getNextRound(tournamentId);

	await savePairings(
		tournamentId,
		nextRound,
		pairings
	);
}

export async function getNextRound(
	tournamentId: number
): Promise<number> {
	const [result] = await sql<{ max_round: number | null }[]>`
		SELECT MAX(round) AS max_round
		FROM matches
		WHERE tournament_id = ${tournamentId}
	`;

	return (result.max_round ?? 0) + 1;
}

export async function getTournamentMatches(
	tournamentId: number
) {
	return await sql`
		SELECT
			m.id,
			m.round,
			m.player1_id,
			p1.name AS player1_name,
			m.player2_id,
			p2.name AS player2_name,
			m.winner_id
		FROM matches m
		LEFT JOIN players p1
			ON m.player1_id = p1.id
		LEFT JOIN players p2
			ON m.player2_id = p2.id
		WHERE m.tournament_id = ${tournamentId}
		ORDER BY m.round, m.id;
	`;
}

export async function isCurrentRoundComplete(
	tournamentId: number
): Promise<boolean> {
	const [result] = await sql<{ max_round: number | null }[]>`
		SELECT MAX(round) AS max_round
		FROM matches
		WHERE tournament_id = ${tournamentId}
	`;

	if (result.max_round === null) {
		return true;
	}

	const [pending] = await sql<{ count: number }[]>`
		SELECT COUNT(*)::int AS count
		FROM matches
		WHERE tournament_id = ${tournamentId}
		AND round = ${result.max_round}
		AND winner_id IS NULL
	`;

	return pending.count === 0;
}

export async function setWinner(
	matchId: number,
	winnerId: number
) {
	await sql`
		UPDATE matches
		SET winner_id = ${winnerId}
		WHERE id = ${matchId}
	`;
}

export async function getRankings(tournamentId: number) {
	return await sql`
		SELECT
			p.id,
			p.name,
			COUNT(m.winner_id)::int AS wins
		FROM tournament_players tp
		JOIN players p
			ON tp.player_id = p.id
		LEFT JOIN matches m
			ON p.id = m.winner_id
			AND m.tournament_id = ${tournamentId}
		WHERE tp.tournament_id = ${tournamentId}
		GROUP BY p.id, p.name
		ORDER BY wins DESC, p.name;
	`;
}

export async function getPlayedPairs(tournamentId: number) {
	const matches = await sql<{
		player1_id: number;
		player2_id: number | null;
	}[]>`
		SELECT
			player1_id,
			player2_id
		FROM matches
		WHERE tournament_id = ${tournamentId}
	`;

	return new Set(
		matches
			.filter(match => match.player2_id !== null)
			.flatMap(match => [
				`${match.player1_id}-${match.player2_id}`,
				`${match.player2_id}-${match.player1_id}`
			])
	);
}

export async function getTournamentStatus(
	tournamentId: number
) {
	const [pending] = await sql<{ count: number }[]>`
		SELECT COUNT(*)::int AS count
		FROM matches
		WHERE tournament_id = ${tournamentId}
		AND winner_id IS NULL
	`;

	const completed = pending.count === 0;

	if (!completed) {
		return {
			completed: false,
			winner: null
		};
	}

	const [winner] = await sql<{
		id: number;
		name: string;
		wins: number;
	}[]>`
		SELECT
			p.id,
			p.name,
			COUNT(m.winner_id)::int AS wins
		FROM players p
		JOIN tournament_players tp
			ON tp.player_id = p.id
		LEFT JOIN matches m
			ON m.winner_id = p.id
			AND m.tournament_id = ${tournamentId}
		WHERE tp.tournament_id = ${tournamentId}
		GROUP BY p.id, p.name
		ORDER BY wins DESC
		LIMIT 1;
	`;

	return {
		completed: true,
		winner
	};
}

export { shufflePlayers, createPairings };