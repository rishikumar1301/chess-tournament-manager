import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from './$types';

import {
    getPlayers,
    createPlayer,
    getPlayerByEmail,
    getAvailablePlayers,
} from '$lib/server/player.service'

export const GET: RequestHandler = async ({ url }) => {

	try {

		const tournamentId = url.searchParams.get('tournamentId');

		if (tournamentId) {

			const players = await getAvailablePlayers(Number(tournamentId));

			return json(players);

		}

		const players = await getPlayers();

		return json(players);

	} catch (error) {

		console.error(error);

		return json(
			{ error: 'Failed to fetch players' },
			{ status: 500 }
		);

	}

};

export const POST : RequestHandler = async ({request})=>{
    try {
        const {name, email, country} = await request.json();

        if(!name?.trim()){
            return json(
                {error:'Name is required'},
                {status: 400}
            );
        }

        if(!email?.trim()){
            return json(
                {error: ' Email is required'},
                {status: 400},
            );
        }

        const existing = await getPlayerByEmail(email.trim());

        if(existing){
            return json(
                {error: 'Email already exists'},
                {status: 409 }
            );
        }

        const player = await createPlayer(
            name.trim(),
            email.trim(),
            country?.trim() || null
        )

        return json(player, {status:201})
        
    } catch (error) {
        console.error(error);

        return json(
            {error: 'Internal server error'},
            {status:500}
        );
        
    }
};