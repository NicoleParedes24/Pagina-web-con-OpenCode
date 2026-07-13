# Gestor de Actividades 📋

Aplicación web **Full Stack** para la gestión de actividades y un blog de notas.  
El proyecto cuenta con un backend desarrollado con **Node.js + Express** y un frontend utilizando **HTML, CSS y JavaScript Vanilla**, con soporte completo para idioma español.

---

# 📋 Características principales

## Gestión de Actividades
- Crear, consultar, actualizar y eliminar actividades.
- Control de estados:
  - Pendiente
  - Completada
- Visualización organizada de todas las actividades.
- Edición rápida de información.
- Eliminación de actividades.

## Dashboard de Actividades
- Vista general de todas las actividades registradas.
- Búsqueda por texto.
- Filtrado de actividades.
- Acciones rápidas sobre cada actividad.

## Calendario Integrado
- Visualización de actividades mediante calendario.
- Integración con **FullCalendar**.
- Consulta visual de fechas importantes.

## Blog / Notas
- Creación de notas personales.
- Visualización de notas en formato tarjeta.
- Edición y eliminación de publicaciones.
- Vista detallada mediante ventana modal.

## Seguridad y Experiencia de Usuario
- Protección contra ataques XSS mediante escape de HTML.
- Diseño responsive adaptable a:
  - Escritorio
  - Tablet
  - Dispositivos móviles
- Notificaciones tipo Toast para confirmar acciones realizadas.

---

# 🚀 Instalación y ejecución

## Requisitos previos

Antes de ejecutar el proyecto necesitas tener instalado:

- Node.js versión 14 o superior.
- npm.

Puedes verificar las versiones con:

```bash
node -v
npm -v
```

---

# ⚙️ Instalación

Clonar o descargar el proyecto:

```bash
git clone <url-del-repositorio>
```

Ingresar al backend:

```bash
cd backend
```

Instalar dependencias:

```bash
npm install
```

---

# ▶️ Ejecución del proyecto

## Modo desarrollo

Ejecuta:

```bash
npm run dev
```

El proyecto utilizará **nodemon** para reiniciar automáticamente el servidor cuando existan cambios.

## Modo producción

Ejecuta:

```bash
npm start
```

---

Después abre el navegador en:

```
http://localhost:3000
```

El backend se encarga de servir automáticamente los archivos del frontend.

---

# 📁 Estructura del proyecto

```
Pagina-web-con-OpenCode/
│
├── backend/
│   │
│   ├── server.js
│   │   └── Configuración principal de Express, middlewares y manejo de errores.
│   │
│   ├── routes/
│   │   ├── actividades.js
│   │   │   └── Rutas REST para actividades.
│   │   │
│   │   └── notas.js
│   │       └── Rutas REST para notas del blog.
│   │
│   ├── controllers/
│   │   ├── actividadesController.js
│   │   │   └── Lógica de negocio y persistencia de actividades.
│   │   │
│   │   └── notasController.js
│   │       └── Lógica de negocio y persistencia de notas.
│   │
│   └── data/
│       ├── actividades.json
│       │   └── Almacenamiento de actividades.
│       │
│       └── notas.json
│           └── Almacenamiento de notas.
│
└── frontend/
    │
    ├── index.html
    │   └── Página principal del gestor de actividades.
    │
    ├── blog.html
    │   └── Página del módulo de notas.
    │
    ├── css/
    │   ├── styles.css
    │   │   └── Estilos generales del sistema.
    │   │
    │   └── blog.css
    │       └── Estilos específicos del blog.
    │
    └── js/
        ├── api.js
        │   └── Comunicación con la API backend.
        │
        ├── ui.js
        │   └── Manipulación de interfaz de actividades.
        │
        ├── calendar.js
        │   └── Integración con FullCalendar.
        │
        ├── app.js
        │   └── Inicialización y coordinación de la aplicación.
        │
        └── blog.js
            └── Lógica del módulo de notas.
```

---

# 🔌 API Backend

## URL Base

```
http://localhost:3000
```

---

# 📌 Endpoints de Actividades

Ruta principal:

```
/actividades
```

| Método | Endpoint | Descripción | Campos requeridos |
|---|---|---|---|
| GET | / | Obtener todas las actividades | Ninguno |
| POST | / | Crear actividad | titulo, fecha |
| PUT | /:id | Actualizar actividad | titulo, fecha |
| PATCH | /:id/estado | Cambiar estado | Ninguno |
| DELETE | /:id | Eliminar actividad | Ninguno |

---

# 📝 Endpoints de Notas / Blog

Ruta principal:

```
/notas
```

| Método | Endpoint | Descripción | Campos requeridos |
|---|---|---|---|
| GET | / | Obtener todas las notas | Ninguno |
| POST | / | Crear nota | titulo, contenido |
| PUT | /:id | Actualizar nota | titulo, contenido |
| DELETE | /:id | Eliminar nota | Ninguno |

---

# 🎨 Páginas del Frontend

## Gestor de Actividades

Ruta:

```
/
```

Incluye:

- Dashboard principal.
- Lista de actividades.
- Buscador.
- Filtros.
- Calendario.
- Botones de edición y eliminación.
- Cambio de estado.

---

## Blog / Notas

Ruta:

```
/blog.html
```

Incluye:

- Creación de notas.
- Listado mediante tarjetas.
- Edición.
- Eliminación.
- Visualización detallada mediante modal.

---

# ⚙️ Configuración

## Puerto del servidor

Por defecto:

```
3000
```

Puede modificarse mediante una variable de entorno:

```bash
PORT=5000 npm start
```

---

# 🌐 Configuración de API

La URL del backend se encuentra configurada en:

```
frontend/js/api.js
frontend/js/blog.js
```

Actualmente utiliza:

```
http://localhost:3000
```

Para cambiar el servidor API se deben actualizar estos archivos.

---

# 📦 Almacenamiento de datos

Actualmente el proyecto utiliza archivos JSON como almacenamiento.

No requiere base de datos.

Ubicación:

```
backend/data/
```

Archivos utilizados:

```
actividades.json
```

Almacena todas las actividades.

```
notas.json
```

Almacena todas las notas del blog.

Los archivos se crean automáticamente si no existen.

---

# 🎯 Estados de actividades

Las actividades manejan dos estados:

### Pendiente

Estado inicial por defecto.

### Completada

Estado utilizado cuando la actividad finaliza.

---

# 🎨 Sistema de diseño

## Variables CSS

Los colores principales están definidos mediante variables CSS en:

```css
:root
```

Valores principales:

| Variable | Color |
|---|---|
| Primary | #6366f1 |
| Success | #22c55e |
| Warning | #f59e0b |
| Danger | #ef4444 |

---

# 📱 Diseño Responsive

El sistema está adaptado para diferentes dispositivos:

### Escritorio

Diseño principal.

### Tablet

```css
@media(max-width:768px)
```

### Móvil

```css
@media(max-width:480px)
```

---

# 📐 Convención CSS

El proyecto utiliza una nomenclatura basada en BEM:

Ejemplos:

```
.activity-card
.nota-card-header
.btn-sm
```

Además incluye clases utilitarias para patrones comunes.

---

# 📚 Dependencias externas

## Frontend

Incluidas mediante CDN:

- Google Fonts:
  - Familia Inter.

- FullCalendar v6.1.9:
  - Visualización de calendario de actividades.

---

## Backend

Dependencias principales:

### Express

Framework web utilizado para crear la API REST.

### Nodemon

Herramienta utilizada únicamente en desarrollo para reiniciar automáticamente el servidor.

---

# ✅ Estado del proyecto

Proyecto funcional con arquitectura separada:

- Backend API REST.
- Frontend independiente.
- Persistencia mediante archivos JSON.
- Gestión completa de actividades.
- Sistema de notas/blog.
- Diseño adaptable.