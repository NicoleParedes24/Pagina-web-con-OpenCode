const express = require('express');
const cors = require('cors');
const actividadesRoutes = require('./routes/actividades');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Servir archivos estáticos del frontend
app.use(express.static('../frontend'));

// Rutas de la API
app.use('/actividades', actividadesRoutes);

// Ruta raíz — servir el frontend
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: '../frontend' });
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Manejo global de errores
app.use((err, req, res, next) => {
  console.error('Error del servidor:', err.message);
  res.status(500).json({ error: 'Error interno del servidor' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
