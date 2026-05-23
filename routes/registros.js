const express  = require('express');
const router   = express.Router();
const Registro = require('../models/Registro');

// ============================================================
//  GET /api/registros?uid=xxx
//  Devuelve todos los registros del usuario ordenados por fecha
// ============================================================
router.get('/', async (req, res) => {
  const { uid } = req.query;

  if (!uid) {
    return res.status(400).json({ error: 'El parámetro uid es obligatorio' });
  }

  try {
    const registros = await Registro
      .find({ uid })
      .sort({ createdAt: -1 });

    res.json(registros);
  } catch (error) {
    console.error('Error al obtener registros:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// ============================================================
//  POST /api/registros
//  Guarda un nuevo registro académico
// ============================================================
router.post('/', async (req, res) => {
  const { uid, displayName, email, asignatura, nota, creditos } = req.body;

  // Validar campos obligatorios
  if (!uid || !asignatura || nota === undefined || !creditos) {
    return res.status(400).json({ error: 'Faltan campos obligatorios: uid, asignatura, nota, creditos' });
  }

  try {
    const nuevo = new Registro({
      uid,
      displayName: displayName || '',
      email:       email       || '',
      asignatura,
      nota:     Number(nota),
      creditos: Number(creditos)
    });

    const guardado = await nuevo.save();
    res.status(201).json({ id: guardado._id, message: 'Registro guardado correctamente' });

  } catch (error) {
    if (error.name === 'ValidationError') {
      const mensaje = Object.values(error.errors).map(e => e.message).join(', ');
      return res.status(400).json({ error: mensaje });
    }
    console.error('Error al guardar registro:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// ============================================================
//  DELETE /api/registros/:id
//  Elimina un registro por su ID de MongoDB
// ============================================================
router.delete('/:id', async (req, res) => {
  try {
    const eliminado = await Registro.findByIdAndDelete(req.params.id);
    if (!eliminado) {
      return res.status(404).json({ error: 'Registro no encontrado' });
    }
    res.json({ message: 'Registro eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar registro:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;
