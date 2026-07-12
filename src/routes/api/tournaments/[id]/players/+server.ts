import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

import {
	getTournamentPlayers,
	addPlayerToTournament,
    removePlayerFromTournament
} from '$lib/server/tournament-player.service';

export const GET: RequestHandler = async ({ params }) => {
	try {
		const tournamentId = Number(params.id);

		const players = await getTournamentPlayers(tournamentId);

		return json(players);
	} catch (error) {
		console.error(error);

		return json(
			{ error: 'Failed to fetch tournament players' },
			{ status: 500 }
		);
	}
};

export const POST: RequestHandler = async ({ params, request }) => {
	try {
		const tournamentId = Number(params.id);

		const { playerId } = await request.json();

		if (!playerId) {
			return json(
				{ error: 'Player is required' },
				{ status: 400 }
			);
		}

		const result = await addPlayerToTournament(
			tournamentId,
			Number(playerId)
		);

		return json(result, { status: 201 });

	} catch (error: any) {
		console.error(error);

		// PostgreSQL UNIQUE constraint
		if (error.code === '23505') {
			return json(
				{ error: 'Player is already in this tournament.' },
				{ status: 409 }
			);
		}

		return json(
			{ error: 'Internal server error' },
			{ status: 500 }
		);
	}
};

export const DELETE: RequestHandler = async ({ params, request }) => {
	try {
		const tournamentId = Number(params.id);

		const { playerId } = await request.json();

		const deleted = await removePlayerFromTournament(
			tournamentId,
			Number(playerId)
		);

		if (!deleted) {
			return json(
				{ error: 'Player not found in tournament' },
				{ status: 404 }
			);
		}

		return json({
			message: 'Player removed successfully'
		});

	} catch (error) {
		console.error(error);

		return json(
			{ error: 'Internal server error' },
			{ status: 500 }
		);
	}
};