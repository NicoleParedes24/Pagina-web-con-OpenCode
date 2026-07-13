# AGENTS.md

## Proyecto

"Gestor de Actividades" — aplicacion full-stack con blog de notas. Interfaz en espanol.

- **Backend:** Node.js + Express, entrada `backend/server.js`
- **Frontend:** Vanilla HTML/CSS/JS, entrada `frontend/index.html`
- **Datos:** Archivos JSON planos en `backend/data/` (sin base de datos)
- **Sin tests, sin linter, sin typecheck configurados**

## Ejecucion

```bash
cd backend/
npm install
npm run dev     # nodemon, puerto 3000
npm start       # produccion
```

Abrir `http://localhost:3000`. El backend sirve el frontend como archivos estaticos.

---

## Backend

### Archivos

```
backend/
  server.js                             # App Express, middlewares, error handlers
  routes/actividades.js                 # Rutas REST de actividades (CRUD)
  routes/notas.js                       # Rutas REST de blog/notas (CRUD)
  controllers/actividadesController.js  # Lectura/escritura de actividades.json
  controllers/notasController.js        # Lectura/escritura de notas.json
  data/actividades.json                 # Persistencia de actividades
  data/notas.json                       # Persistencia de notas del blog
```

### API Endpoints

**Actividades** (`/actividades`):
- `GET /` — Obtener todas
- `POST /` — Crear (requiere: titulo, fecha)
- `PUT /:id` — Actualizar completa (requiere: titulo, fecha)
- `PATCH /:id/estado` — Cambiar estado (Pendiente/Completada)
- `DELETE /:id` — Eliminar

**Blog/Notas** (`/notas`):
- `GET /` — Obtener todas
- `POST /` — Crear (requiere: titulo, contenido)
- `PUT /:id` — Actualizar (requiere: titulo, contenido)
- `DELETE /:id` — Eliminar

### Detalles clave

- `actividades.json` y `notas.json` se crean automaticamente si no existen
- Estado de actividades: solo `"Pendiente"` o `"Completada"`
- Puerto configurable via variable de entorno `PORT`
- Backend sirve archivos estaticos desde `../frontend`

---

## Frontend

### Archivos

```
frontend/
  index.html          # Pagina principal: Gestor de Actividades
  blog.html           # Pagina del Blog de Notas
  css/styles.css      # Estilos compartidos (variables, botones, paneles, etc.)
  css/blog.css        # Estilos exclusivos del blog
  js/api.js           # Capa de comunicacion con API de actividades
  js/ui.js            # Manipulacion DOM para actividades
  js/calendar.js      # Integracion FullCalendar
  js/app.js           # Init, eventos, orquestacion de actividades
  js/blog.js          # Logica completa del blog de notas
```

### Paginas

- **`/`** — Gestor de Actividades: CRUD con dashboard, filtros y calendario
- **`/blog.html`** — Blog de Notas: crear, editar, leer y eliminar notas

### Dependencias externas (CDN)

- Google Fonts (Inter)
- FullCalendar v6.1.9 (solo para actividades)

### Detalles clave

- URL del API hardcodeada a `http://localhost:3000` en `js/api.js` y `js/blog.js`
- Navegacion entre paginas via links en el header
- Funcion `escaparHTML()` para prevenir XSS en ambas paginas
- Toast notifications para feedback al usuario
- Modal para vista detalle de notas
- Formato de fechas en espanol

### Convenciones de estilos CSS

- Variables CSS en `:root` para colores, sombras, bordes, transiciones
- Clases BEM-like: `.activity-card`, `.nota-card-header`, `.btn-sm`
- Responsive con `@media (max-width: 768px)` y `480px`
- Paleta: primary (#6366f1), success (#22c55e), warning (#f59e0b), danger (#ef4444)
