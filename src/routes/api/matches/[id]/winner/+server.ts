import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

import { setWinner } from '$lib/server/match.service';

export const PUT: RequestHandler = async ({ params, request }) => {
	try {
		const matchId = Number(params.id);

		const { winnerId } = await request.json();

		await setWinner(matchId, winnerId);
		

		return json({
			message: 'Winner updated successfully.'
		});

	} catch (error) {
		console.error(error);

		return json(
			{ error: 'Failed to update winner' },
			{ status: 500 }
		);
	}
};