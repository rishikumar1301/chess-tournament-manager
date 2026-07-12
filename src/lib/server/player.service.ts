import sql from "$lib/server/db";

export interface Player{
    id: number,
    name: string,
    email: string,
    country: string|null,
    created_at: Date,
}



export async function getPlayers(): Promise<Player[]> {
    return await sql<Player[]>`
    
        SELECT 
            id,
            name,
            email,
            country,
            created_at
        from players 
        ORDER BY id;    
    `;
    
}

export async function getPlayerByEmail(email: string) {
    const players = await sql<Player[]>`
        SELECT *
        from players
        where email = ${email};
         `;

    return players[0] ?? null;     
    
}


export async function createPlayer(
    name: string,
    email: string,
    country: string| null
) {
    const players = await sql <Player[]>`
      INSERT INTO players(name, email, country)
      VALUES (${name}, ${email}, ${country})
      RETURNING*;
    `;
    return players[0];
}


export async function updatePlayer(
    id: number,
    name:string,
    email:string,
    country:string| null
){
    const players =await sql<Player[]>`
      UPDATE players
      SET
         name = ${name},
         email = ${email},
         country = ${country}
      where id = ${id}
      RETURNING *;    
    `;

    return players[0] ?? null;
}


export async function deletePlayer(id:number) {
    const players = await sql<Player[]>`
      DELETE FROM players
      WHERE id = ${id}
      RETURNING *;
    `;


return players[0] ?? null;
    
}

export async function getAvailablePlayers(
	tournamentId: number
): Promise<Player[]> {

	return await sql<Player[]>`

		SELECT
			id,
			name,
			email,
			country,
			created_at

		FROM players

		WHERE id NOT IN (

			SELECT player_id
			FROM tournament_players
			WHERE tournament_id = ${tournamentId}

		)

		ORDER BY name;

	`;
}