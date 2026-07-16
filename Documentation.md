# Coffee Brew Log — Documentation

## Project description

Coffee Brew Log is a responsive full-stack application for a micro-roastery. Users can create, read, filter, edit, and delete brew records. The frontend communicates with the backend through a JSON REST API.

## Technology stack

- Frontend: React, Vite, Bootstrap, Axios
- Backend: Node.js, Express, Sequelize ORM
- Database: SQLite locally; PostgreSQL supported for production
- Security: Helmet, CORS, environment variables

## Repository structure

- `frontend/` — React client
- `backend/` — Express API and Sequelize model
- `Documentation.md` — setup and project description
- `deployment.md` — deployment instructions and deployment URL placeholder

## Local setup

### Prerequisites

- Node.js 20 or later
- npm

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd coffee-brew-log
```

### 2. Start the backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

The API starts at `http://localhost:5000` and creates a local SQLite database under `backend/data/`.

### 3. Start the frontend

Open another terminal:

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Open `http://localhost:5173`.

## Environment variables

### Backend

- `PORT` — API port
- `NODE_ENV` — `development` or `production`
- `DATABASE_URL` — SQLite or PostgreSQL connection URL
- `FRONTEND_URL` — allowed frontend origin; comma-separated values are supported

### Frontend

- `VITE_API_URL` — backend API base URL ending in `/api`

## API endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/brews` | List all brews |
| GET | `/api/brews?brewMethod=V60` | Filter by method |
| GET | `/api/brews/:id` | Read one brew |
| POST | `/api/brews` | Create a brew |
| PUT | `/api/brews/:id` | Replace/update a brew |
| DELETE | `/api/brews/:id` | Delete a brew |
| GET | `/api/health` | Health check |

## Example request body

```json
{
  "coffeeName": "Ethiopia Guji",
  "brewMethod": "V60",
  "coffeeWeight": 18,
  "waterAmount": 300,
  "brewTime": 165,
  "rating": 5,
  "notes": "Floral aroma, peach sweetness and a tea-like finish."
}
```

## Validation and status codes

All fields are required on both create and edit forms. The backend also validates all fields before saving.

- `200 OK` — successful read or update
- `201 Created` — successful creation
- `204 No Content` — successful deletion
- `400 Bad Request` — validation failure
- `404 Not Found` — missing record or endpoint
- `500 Internal Server Error` — unexpected error

## Suggested commit history

```text
chore: initialise frontend and backend projects
feat: add brew model and database configuration
feat: implement brew CRUD API
feat: build responsive brew log interface
feat: add brew create and edit validation
feat: add brew method filtering
feat: add delete confirmation and feedback alerts
docs: add setup and deployment documentation
```
