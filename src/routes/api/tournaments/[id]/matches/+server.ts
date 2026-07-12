import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

import { getTournamentMatches } from '$lib/server/match.service';

export const GET: RequestHandler = async ({ params }) => {
	try {
		const tournamentId = Number(params.id);

		const matches = await getTournamentMatches(tournamentId);

		return json(matches);

	} catch (error) {
		console.error(error);

		return json(
			{ error: 'Failed to fetch matches' },
			{ status: 500 }
		);
	}
};