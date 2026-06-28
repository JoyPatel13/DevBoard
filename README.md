# DevBoard — AI-Powered Developer Productivity Hub

A full-stack developer productivity application built with React, TypeScript, Node.js, Express, Prisma, and PostgreSQL. DevBoard helps developers manage tasks, track focus sessions, and get AI-powered assistance — all in one place.

> 🚧 Currently in active development (Week 5 of 9)

---

## Features (Planned)

- **JWT Auth** — Secure register/login with refresh token rotation
- **Task Tracker** — Kanban-style board with priority and status management
- **AI Code Reviewer** — Paste a snippet, get structured feedback via Gemini API
- **AI Subtask Generator** — Describe a feature, AI breaks it into actionable tasks
- **Pomodoro Timer** — Focus sessions with session logging and analytics
- **Daily Standup Generator** — AI drafts your standup based on what you worked on
- **GitHub Activity Feed** — Visualize your contribution heatmap via GitHub API

---

## Tech Stack

**Frontend**
- React + TypeScript
- Vite
- Tailwind CSS v4
- React Router DOM
- Axios

**Backend**
- Node.js + Express + TypeScript
- Prisma v6 ORM
- PostgreSQL (Neon)
- JWT (Access + Refresh Token Rotation)
- bcryptjs, cookie-parser

**AI**
- Google Gemini API

**Deployment**
- Frontend → Vercel
- Backend → Render
- Database → Neon (PostgreSQL)

---

## Project Structure

```
devBoard/
├── frontend/          # React + Vite + Tailwind frontend
│   └── src/
│       ├── pages/     # Login, Register, Dashboard
│       ├── components/
│       ├── services/  # Axios API calls
│       ├── hooks/
│       └── store/
│
└── backend/           # Express + Prisma backend
    └── src/
        ├── controllers/
        ├── routes/
        ├── middleware/
        └── utils/
```

---

## Current Progress

- [x] Monorepo scaffold with frontend and backend
- [x] TypeScript + Express backend
- [x] React + Vite + Tailwind v4 frontend
- [x] PostgreSQL schema (User, Task, PomodoroSession) on Neon
- [x] JWT auth — register, login, refresh token rotation
- [x] Auth middleware (VerifyUser)
- [x] Full Task CRUD API
- [ ] Frontend pages — Login, Register, Dashboard
- [ ] Kanban board UI
- [ ] AI features (Gemini API)
- [ ] GitHub heatmap
- [ ] Pomodoro timer
- [ ] Deployment

---

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database (or a free [Neon](https://neon.tech) account)

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder:

```env
DATABASE_URL="your-neon-connection-string"
ACCESS_TOKEN_SECRET="your-access-token-secret"
REFRESH_TOKEN_SECRET="your-refresh-token-secret"
PORT=5000
```

```bash
npx prisma migrate dev --name init
npm run dev
```

Backend runs at `http://localhost:5000`

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`

---

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and receive tokens |
| POST | `/api/auth/refresh` | Refresh access token |

### Tasks *(Protected — requires Bearer token)*
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/tasks/create` | Create a new task |
| GET | `/api/tasks/` | Get all tasks for logged-in user |
| PUT | `/api/tasks/update/:id` | Update a task |
| DELETE | `/api/tasks/delete/:id` | Delete a task |

---

## Author

**Joy Patel** — [GitHub](https://github.com/your-username)

---

