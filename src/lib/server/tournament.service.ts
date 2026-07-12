import sql from '$lib/server/db';
import type { Tournament } from '$lib/types/tournament';


export async function createTournament(
	name: string,
	status: string = 'upcoming'
): Promise<Tournament> {

	const [tournament] = await sql<Tournament[]>`
		INSERT INTO tournaments (name, status)
		VALUES (${name}, ${status})
		RETURNING
			id,
			name,
			status,
			created_at;
	`;

	return tournament;
}

export async function getTournaments(): Promise<Tournament[]> {
	return await sql<Tournament[]>`
		SELECT
			id,
			name,
			status,
			created_at
		FROM tournaments
		ORDER BY id;
	`;
}

export async function getTournamentById(
	id: number
): Promise<Tournament | null> {
	const [tournament] = await sql<Tournament[]>`
		SELECT
			id,
			name,
			status,
			created_at
		FROM tournaments
		WHERE id = ${id};
	`;

	return tournament ?? null;
}

export async function updateTournament(
	id: number,
	name: string,
	status: string
): Promise<Tournament | null> {

	const [tournament] = await sql<Tournament[]>`
		UPDATE tournaments
		SET
			name = ${name},
			status = ${status}
		WHERE id = ${id}
		RETURNING
			id,
			name,
			status,
			created_at;
	`;

	return tournament ?? null;
}

export async function deleteTournament(
	id: number
): Promise<boolean> {

	const result = await sql`
		DELETE FROM tournaments
		WHERE id = ${id};
	`;

	return result.count > 0;
}