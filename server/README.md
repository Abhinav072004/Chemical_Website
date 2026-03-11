# Chemical Website – Admin API Server

## Setup

```bash
npm install
npm run seed
```

Default admin login (change in production):

- **Email:** `admin@iiti.ac.in`
- **Password:** `admin123`

Set `ADMIN_PASSWORD` when running `npm run seed` to use a different password.

## Run

- **Development:** `npm run dev` (watch mode)
- **Production:** `npm start`

Server runs on port **3001** by default. Set `PORT` to override.

## API

- `POST /api/auth/login` – body: `{ "email", "password" }` → `{ "token", "user" }`
- `GET /api/faculty` – list all faculty (public)
- `GET /api/faculty/:id` – get one faculty (public)
- `POST /api/admin/faculty` – create faculty (auth)
- `PUT /api/admin/faculty/:id` – update faculty (auth)
- `DELETE /api/admin/faculty/:id` – delete faculty (auth)
- `GET /api/events` – list upcoming and past events (public)
- `POST /api/admin/events` – create event (auth)
- `PUT /api/admin/events/:id` – update event (auth)
- `DELETE /api/admin/events/:id` – delete event (auth)

Send JWT in header: `Authorization: Bearer <token>`.

## Database

SQLite file: `data.db` (created on first run). Ignored by git.
