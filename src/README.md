# ♟️ Chess Tournament Management System

A full-stack Chess Tournament Management System built with **SvelteKit**, **TypeScript**, **Tailwind CSS**, and **PostgreSQL (Neon)**. The application allows organizers to manage players, create tournaments, generate matches, record winners, and display live rankings.

## 🚀 Live Demo

🌐 https://chess-tournament-manager-rose.vercel.app

## 📂 GitHub Repository

🔗 https://github.com/rishikumar1301/chess-tournament-manager



---

# ✨ Features

## 👥 Player Management

- Create Player
- View Players
- Update Player
- Delete Player
- Search Players

---

## 🏆 Tournament Management

- Create Tournament
- Update Tournament
- Delete Tournament
- View Tournament Details

---

## ♟️ Tournament Players

- Add players to a tournament
- Remove players from a tournament
- Prevent duplicate player entries

---

## 🎲 Match Generation

- Generate random match pairings
- Supports multiple rounds
- Handles odd number of players (Bye)

---

## 🥇 Winner Management

- Select winner for each match
- Store match results in the database
- Prevent generating a new round until the current round is completed

---

## 📊 Rankings

- Live rankings based on match wins
- Automatically updates after selecting winners

---

## 🎉 Tournament Completion

- Detects when all matches are completed
- Displays tournament champion

---

# 🛠️ Tech Stack

### Frontend

- Svelte 5
- SvelteKit
- TypeScript
- Tailwind CSS
- Lucide Icons

### Backend

- SvelteKit API Routes
- PostgreSQL
- Neon Database

### Deployment

- Vercel

---

# 📁 Project Structure

```
src
│
├── lib
│   ├── components
│   │   ├── layout
│   │   ├── players
│   │   └── tournaments
│   │
│   ├── server
│   │   ├── db.ts
│   │   ├── player.service.ts
│   │   ├── tournament.service.ts
│   │   └── match.service.ts
│   │
│   └── types
│
├── routes
│   ├── api
│   ├── players
│   └── tournaments
│
└── app.html
```

---

# 🗄️ Database

The application uses **PostgreSQL (Neon)**.

Main Tables:

- players
- tournaments
- tournament_players
- matches

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/rishikumar1301/chess-tournament-manager.git
```

## Move into project

```bash
cd chess-tournament-manager
```

## Install Dependencies

```bash
npm install
```

---

## Configure Environment Variables

Create a `.env` file in the project root.

```env
DATABASE_URL=your_postgresql_connection_string
```

---

## Run Development Server

```bash
npm run dev
```

Application will run at:

```
http://localhost:5173
```

---

## Build for Production

```bash
npm run build
```

---

## Preview Production Build

```bash
npm run preview
```

---

# 📸 Screenshots

> Add screenshots of the following pages.

- Home Page
- Players Page
- Tournaments Page
- Tournament Details
- Rankings

---

# 🎯 Future Improvements

- Swiss Tournament Pairing
- Automatic Winner Simulation
- Player Statistics
- Tournament History
- Authentication & Authorization
- Export Results (PDF/CSV)

---

# 👨‍💻 Author

**Rishi Kumar**

- GitHub: https://github.com/rishikumar1301
- LinkedIn: https://www.linkedin.com/in/rishi-kumar13012

---

# 📄 License


