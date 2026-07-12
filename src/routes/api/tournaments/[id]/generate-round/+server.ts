import { json } from '@sveltejs/kit';
import type{RequestHandler} from './$types'

import { generateRound } from '$lib/server/match.service';

export const POST: RequestHandler = async ({ params }) => {
    try {
        const tournamentId = Number(params.id);

        // First version always creates Round 1
        await generateRound(tournamentId);

        return json({
            message: 'Round generated successfully.'
        });
    } catch (error: any) {
        console.error(error);

        return json(
            { error: error.message },
            { status: 400 }
        );
    }
};