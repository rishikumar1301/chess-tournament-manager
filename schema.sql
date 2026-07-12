CREATE TABLE players(
  id serial PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  country TEXT,
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE tournaments(
  id SERIAL PRIMARY KEY ,
  name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'upcoming', -- PENDING, ONGOING, COMPLETED
  created_at TIMESTAMP DEFAULT now()    
);

CREATE TABLE tournament_players(
  id SERIAL PRIMARY KEY,
  tournament_id INT NOT NULL REFERENCES tournaments(id) ON DELETE CASCADE,
  player_id INT NOT NULL REFERENCES players(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT now(),
  wins INTEGER NOT NULL DEFAULT 0,
  losses INTEGER NOT NULL DEFAULT 0,
  unique(tournament_id, player_id)
);
CREATE TABLE matches (
  id SERIAL PRIMARY KEY,
  tournament_id INTEGER NOT NULL REFERENCES tournaments(id) ON DELETE CASCADE,
  round INTEGER NOT NULL,
  player1_id INTEGER REFERENCES players(id),
  player2_id INTEGER REFERENCES players(id), -- NULL if player1 got a bye
  winner_id INTEGER REFERENCES players(id),
  created_at TIMESTAMP DEFAULT now()
);