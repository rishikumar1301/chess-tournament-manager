import postgres from 'postgres';
import dotenv from 'dotenv';

dotenv.config();

const sql = postgres(process.env.DATABASE_URL, { ssl: 'require' });

async function seed() {
  // Clear existing data (safe to re-run anytime during development)
  await sql`DELETE FROM matches`;
  await sql`DELETE FROM tournament_players`;
  await sql`DELETE FROM tournaments`;
  await sql`DELETE FROM players`;

  const players = await sql`
    INSERT INTO players (name, email, country) VALUES
    ('Magnus Carlsen', 'magnus@example.com', 'Norway'),
    ('Hikaru Nakamura', 'hikaru@example.com', 'USA'),
    ('Fabiano Caruana', 'fabiano@example.com', 'USA'),
    ('Ding Liren', 'ding@example.com', 'China'),
    ('Alireza Firouzja', 'alireza@example.com', 'France'),
    ('Viswanathan Anand', 'anand@example.com', 'India')
    RETURNING id, name
  `;

  console.log('Seeded players:', players.map(p => p.name).join(', '));

  const [tournament] = await sql`
    INSERT INTO tournaments (name, status) VALUES ('Summer Chess Open 2026', 'upcoming')
    RETURNING id
  `;

  for (const player of players) {
    await sql`
      INSERT INTO tournament_players (tournament_id, player_id)
      VALUES (${tournament.id}, ${player.id})
    `;
  }

  console.log('Seeded tournament', tournament.id, 'with', players.length, 'players');

  await sql.end();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});