import sql from '$lib/server/db'
import { json } from '@sveltejs/kit'

export async function GET() {
    const result = await sql`SELECT NOW()`;
    return json({status:'connected',time: result[0].now})
    
}