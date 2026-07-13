const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { leerActividades, guardarActividades } = require('../controllers/actividadesController');

// GET /actividades — Obtener todas las actividades
router.get('/', (req, res) => {
  try {
    const actividades = leerActividades();
    res.json(actividades);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener actividades' });
  }
});

// POST /actividades — Crear una nueva actividad
router.post('/', (req, res) => {
  try {
    const { titulo, descripcion, fecha, estado } = req.body;

    // Validaciones
    if (!titulo || titulo.trim() === '') {
      return res.status(400).json({ error: 'El título es obligatorio' });
    }
    if (!fecha) {
      return res.status(400).json({ error: 'La fecha es obligatoria' });
    }

    const actividades = leerActividades();

    const nuevaActividad = {
      id: uuidv4(),
      titulo: titulo.trim(),
      descripcion: (descripcion || '').trim(),
      fecha,
      estado: estado === 'Completada' ? 'Completada' : 'Pendiente'
    };

    actividades.push(nuevaActividad);

    if (!guardarActividades(actividades)) {
      return res.status(500).json({ error: 'Error al guardar la actividad' });
    }

    res.status(201).json(nuevaActividad);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la actividad' });
  }
});

// PUT /actividades/:id — Actualizar una actividad completa
router.put('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, descripcion, fecha, estado } = req.body;

    // Validaciones
    if (!titulo || titulo.trim() === '') {
      return res.status(400).json({ error: 'El título es obligatorio' });
    }
    if (!fecha) {
      return res.status(400).json({ error: 'La fecha es obligatoria' });
    }

    const actividades = leerActividades();
    const indice = actividades.findIndex(a => a.id === id);

    if (indice === -1) {
      return res.status(404).json({ error: 'Actividad no encontrada' });
    }

    actividades[indice] = {
      ...actividades[indice],
      titulo: titulo.trim(),
      descripcion: (descripcion || '').trim(),
      fecha,
      estado: estado === 'Completada' ? 'Completada' : 'Pendiente'
    };

    if (!guardarActividades(actividades)) {
      return res.status(500).json({ error: 'Error al guardar los cambios' });
    }

    res.json(actividades[indice]);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la actividad' });
  }
});

// PATCH /actividades/:id/estado — Cambiar solo el estado
router.patch('/:id/estado', (req, res) => {
  try {
    const { id } = req.params;

    const actividades = leerActividades();
    const indice = actividades.findIndex(a => a.id === id);

    if (indice === -1) {
      return res.status(404).json({ error: 'Actividad no encontrada' });
    }

    actividades[indice].estado =
      actividades[indice].estado === 'Pendiente' ? 'Completada' : 'Pendiente';

    if (!guardarActividades(actividades)) {
      return res.status(500).json({ error: 'Error al cambiar el estado' });
    }

    res.json(actividades[indice]);
  } catch (error) {
    res.status(500).json({ error: 'Error al cambiar el estado' });
  }
});

// DELETE /actividades/:id — Eliminar una actividad
router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;

    const actividades = leerActividades();
    const indice = actividades.findIndex(a => a.id === id);

    if (indice === -1) {
      return res.status(404).json({ error: 'Actividad no encontrada' });
    }

    const eliminada = actividades.splice(indice, 1)[0];

    if (!guardarActividades(actividades)) {
      return res.status(500).json({ error: 'Error al eliminar la actividad' });
    }

    res.json({ mensaje: 'Actividad eliminada', actividad: eliminada });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la actividad' });
  }
});

module.exports = router;
