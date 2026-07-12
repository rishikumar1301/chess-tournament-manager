import sql from '$lib/server/db';
import type { Player } from '$lib/types/player';

export async function getTournamentPlayers(
	tournamentId: number
): Promise<Player[]> {
	return await sql<Player[]>`
		SELECT
			p.id,
			p.name,
			p.email,
			p.country,
			p.created_at
		FROM tournament_players tp
		JOIN players p
			ON tp.player_id = p.id
		WHERE tp.tournament_id = ${tournamentId}
		ORDER BY p.name;
	`;
}

export async function addPlayerToTournament(
	tournamentId: number,
	playerId: number
) {
	const [result] = await sql`
		INSERT INTO tournament_players (
			tournament_id,
			player_id
		)
		VALUES (
			${tournamentId},
			${playerId}
		)
		RETURNING *;
	`;

	return result;
}

export async function removePlayerFromTournament(
	tournamentId: number,
	playerId: number
): Promise<boolean> {
	const result = await sql`
		DELETE FROM tournament_players
		WHERE tournament_id = ${tournamentId}
		AND player_id = ${playerId};
	`;

	return result.count > 0;
}