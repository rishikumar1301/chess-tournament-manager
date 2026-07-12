import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

import { getTournamentStatus } from '$lib/server/match.service';

export const GET: RequestHandler = async ({ params }) => {
	try {
		const tournamentId = Number(params.id);

		const status = await getTournamentStatus(tournamentId);

		return json(status);

	} catch (error) {
		console.error(error);

		return json(
			{
				error: 'Failed to fetch tournament status'
			},
			{
				status: 500
			}
		);
	}
};