import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

import { getRankings } from '$lib/server/match.service';

export const GET: RequestHandler = async ({ params }) => {
	try {
		const tournamentId = Number(params.id);

		const rankings = await getRankings(tournamentId);

		return json(rankings);

	} catch (error) {
		console.error(error);

		return json(
			{ error: 'Failed to fetch rankings' },
			{ status: 500 }
		);
	}
};