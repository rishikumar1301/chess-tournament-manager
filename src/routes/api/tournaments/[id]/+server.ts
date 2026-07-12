import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';


import {
	updateTournament,
	deleteTournament,
    getTournamentById
} from '$lib/server/tournament.service';

export const PUT: RequestHandler = async ({ params, request }) => {

	try {

		const id = Number(params.id);

		const { name, status } = await request.json();

		if (!name?.trim()) {
			return json(
				{ error: 'Tournament name is required' },
				{ status: 400 }
			);
		}

		const tournament = await updateTournament(
			id,
			name.trim(),
			status
		);

		if (!tournament) {
			return json(
				{ error: 'Tournament not found' },
				{ status: 404 }
			);
		}

		return json(tournament);

	} catch (error) {

		console.error(error);

		return json(
			{ error: 'Internal server error' },
			{ status: 500 }
		);
	}
};

export const DELETE: RequestHandler = async ({ params }) => {

	try {

		const id = Number(params.id);

		const deleted = await deleteTournament(id);

		if (!deleted) {
			return json(
				{ error: 'Tournament not found' },
				{ status: 404 }
			);
		}

		return json({
			message: 'Tournament deleted successfully'
		});

	} catch (error) {

		console.error(error);

		return json(
			{ error: 'Internal server error' },
			{ status: 500 }
		);
	}
};export const GET: RequestHandler = async ({ params }) => {
	try {
		const id = Number(params.id);

		const tournament = await getTournamentById(id);

		if (!tournament) {
			return json(
				{ error: 'Tournament not found' },
				{ status: 404 }
			);
		}

		return json(tournament);
	} catch (error) {
		console.error(error);

		return json(
			{ error: 'Internal server error' },
			{ status: 500 }
		);
	}
};