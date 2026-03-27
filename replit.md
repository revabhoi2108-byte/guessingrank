# Workspace

## Overview

BGMI Rank Guesser - a full-stack community game app for Indian BGMI/PUBG Mobile players. Users watch gameplay clips and guess the player's rank.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **Frontend**: React + Vite + Tailwind CSS (dark BGMI military theme)
- **Backend**: Express 5 API server
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod, drizzle-zod
- **API codegen**: Orval (from OpenAPI spec)
- **Auth**: JWT + cookie sessions (bcryptjs, jsonwebtoken)

## Structure

```text
artifacts-monorepo/
├── artifacts/
│   ├── api-server/         # Express API server
│   └── bgmi-rank-guesser/  # React + Vite frontend
├── lib/
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/                 # Drizzle ORM schema + DB connection
├── scripts/                # Utility scripts
└── ...config files
```

## Database Schema

- **profiles** - User accounts with coins, weeklyCoins, streakDays, weekly stats
- **clips** - Gameplay clips (youtube_url, correct_rank, likes, views, guesses)
- **guesses** - Individual rank guesses per clip/user
- **comments** - Clip comments with nested replies
- **sessions** - Auth session tokens
- **user_challenges** - Tracks daily/weekly challenge completion and claims

## Pages

- `/` - Home: Daily Challenge, Random Clip, Featured & Hot Clips
- `/clip/:id` - Clip guess page with YouTube embed + 10 rank buttons
- `/upload` - Upload clip form
- `/my-channel` - User profile + uploaded clips
- `/leaderboard` - Top Guessers (sorted by weekly/alltime coins) + Top Uploaders
- `/challenges` - Daily & Weekly Missions with progress + coin rewards
- `/profile/:username` - Public profile page
- `/login` + `/signup` - Auth pages

## Coin & Reward System

- +50 coins for correct guess
- +10 coins for wrong guess (participation reward)
- +20 coins for daily login streak
- +30 coins to uploader when clip hits 10 guesses
- Leaderboard sorts by weeklyCoins (weekly tab) or coins (alltime tab)
- Coin balance shown in navbar (gold star icon)

## Daily/Weekly Challenges

- 3 daily challenges reset each day (make guesses, get correct, login streak)
- 3 weekly challenges reset each week (upload clips, weekly guesses, accuracy)
- Claims give 60-300 coins, tracked in user_challenges table

## Default Test Accounts

- Email: `admin@bgmirank.com` / Password: `password` (BGMIPro)
- Email: `test@test.com` / Password: `password` (ConquerorKing)

## API Routes

- `GET/POST /api/auth/*` - Login, register, logout, get current user (returns coins)
- `GET /api/clips` - List clips (with pagination, sort)
- `GET /api/clips/daily` - Today's daily challenge
- `GET /api/clips/random` - Random clip
- `GET /api/clips/:id` - Clip detail with rank distribution
- `POST /api/clips/upload` - Upload new clip
- `POST /api/clips/:id/guess` - Submit a rank guess (awards coins)
- `POST /api/clips/:id/like` - Like/dislike a clip
- `GET/POST /api/clips/:id/comments` - Comments
- `GET /api/leaderboard/guessers` - Top guessers by coins
- `GET /api/leaderboard/uploaders` - Top uploaders
- `GET /api/challenges` - Get user challenge progress (auth required)
- `POST /api/challenges/claim/:key` - Claim challenge reward
- `GET /api/profiles/:username` - Public profile
- `GET /api/profiles/me/clips` - My uploaded clips
- `POST /api/profiles/me/update` - Update profile

## Seed Data

305 clips seeded across all 10 ranks (Bronze → Conqueror) uploaded by user ID 1.

## Running Locally

1. `pnpm install`
2. `pnpm --filter @workspace/db run push` (sync schema)
3. Start API: `pnpm --filter @workspace/api-server run dev`
4. Start Frontend: `pnpm --filter @workspace/bgmi-rank-guesser run dev`
