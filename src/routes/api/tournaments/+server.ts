import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

import {
	getTournaments,
	createTournament
} from '$lib/server/tournament.service';

export const GET: RequestHandler = async () => {
	try {
		const tournaments = await getTournaments();

		return json(tournaments);
	} catch (error) {
		console.error(error);

		return json(
			{ error: 'Failed to fetch tournaments' },
			{ status: 500 }
		);
	}
};

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { name, status } = await request.json();

		if (!name?.trim()) {
			return json(
				{ error: 'Tournament name is required' },
				{ status: 400 }
			);
		}

		const tournament = await createTournament(
			name.trim(),
			status ?? 'upcoming'
		);

		return json(tournament, { status: 201 });

	} catch (error) {
		console.error(error);

		return json(
			{ error: 'Internal server error' },
			{ status: 500 }
		);
	}
};