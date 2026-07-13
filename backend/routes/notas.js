const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { leerNotas, guardarNotas } = require('../controllers/notasController');

router.get('/', (req, res) => {
  try {
    const notas = leerNotas();
    res.json(notas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener notas' });
  }
});

router.post('/', (req, res) => {
  try {
    const { titulo, contenido } = req.body;

    if (!titulo || titulo.trim() === '') {
      return res.status(400).json({ error: 'El titulo es obligatorio' });
    }
    if (!contenido || contenido.trim() === '') {
      return res.status(400).json({ error: 'El contenido es obligatorio' });
    }

    const notas = leerNotas();

    const nuevaNota = {
      id: uuidv4(),
      titulo: titulo.trim(),
      contenido: contenido.trim(),
      fechaCreacion: new Date().toISOString(),
      fechaModificacion: new Date().toISOString()
    };

    notas.unshift(nuevaNota);

    if (!guardarNotas(notas)) {
      return res.status(500).json({ error: 'Error al guardar la nota' });
    }

    res.status(201).json(nuevaNota);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la nota' });
  }
});

router.put('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, contenido } = req.body;

    if (!titulo || titulo.trim() === '') {
      return res.status(400).json({ error: 'El titulo es obligatorio' });
    }
    if (!contenido || contenido.trim() === '') {
      return res.status(400).json({ error: 'El contenido es obligatorio' });
    }

    const notas = leerNotas();
    const indice = notas.findIndex(n => n.id === id);

    if (indice === -1) {
      return res.status(404).json({ error: 'Nota no encontrada' });
    }

    notas[indice] = {
      ...notas[indice],
      titulo: titulo.trim(),
      contenido: contenido.trim(),
      fechaModificacion: new Date().toISOString()
    };

    if (!guardarNotas(notas)) {
      return res.status(500).json({ error: 'Error al guardar los cambios' });
    }

    res.json(notas[indice]);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la nota' });
  }
});

router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;

    const notas = leerNotas();
    const indice = notas.findIndex(n => n.id === id);

    if (indice === -1) {
      return res.status(404).json({ error: 'Nota no encontrada' });
    }

    const eliminada = notas.splice(indice, 1)[0];

    if (!guardarNotas(notas)) {
      return res.status(500).json({ error: 'Error al eliminar la nota' });
    }

    res.json({ mensaje: 'Nota eliminada', nota: eliminada });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la nota' });
  }
});

module.exports = router;
