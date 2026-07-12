export interface Tournament {
	id: number;
	name: string;
	status: 'upcoming' | 'active' | 'completed';
	created_at?: string;
}