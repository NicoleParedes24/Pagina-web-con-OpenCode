# AGENTS.md

## Project

"Gestor de Actividades" — full-stack task/activity manager. Spanish-language UI and code.

- **Backend:** Node.js + Express, entrypoint `backend/server.js`
- **Frontend:** Vanilla HTML/CSS/JS, entrypoint `frontend/index.html`
- **Data:** Flat JSON file at `backend/data/actividades.json` (no database)
- **No git repo, no tests, no linter, no typecheck configured**

## Running

```bash
# From backend/ directory:
npm run dev     # nodemon, port 3000
npm start       # production
```

Backend serves the frontend as static files from `../frontend`. Open `http://localhost:3000`.

## Architecture

```
backend/
  server.js                          # Express app, static file serving, error handlers
  routes/actividades.js              # REST routes (GET/POST/PUT/PATCH/DELETE)
  controllers/actividadesController.js  # Read/write actividades.json
  data/actividades.json              # Persistence (auto-created if missing)

frontend/
  index.html                         # Single-page UI
  js/api.js                          # Fetch wrapper (hardcoded localhost:3000)
  js/ui.js                           # DOM manipulation
  js/calendar.js                     # FullCalendar integration
  js/app.js                          # App init, event wiring, orchestration
  css/styles.css
```

## Key details

- API base URL is hardcoded to `http://localhost:3000/actividades` in `frontend/js/api.js:5`
- `actividades.json` is created automatically on first read if it doesn't exist
- Estado values are strictly `"Pendiente"` or `"Completada"` (Spanish)
- FullCalendar loaded from CDN (v6.1.9)
- Language: all variable names, comments, and UI text are in Spanish
