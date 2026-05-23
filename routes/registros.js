const express = require('express');
const router = express.Router();

const Registro = require('../models/Registro');

// ======================================================
// GET /api/registros?uid=xxx
// ======================================================
router.get('/', async (req, res) => {
  try {

    const { uid } = req.query;

    if (!uid) {
      return res.status(400).json({
        error: 'El parámetro uid es obligatorio'
      });
    }

    const registros = await Registro.find({ uid })
      .sort({ createdAt: -1 });

    res.json(registros);

  } catch (error) {

    console.error('❌ Error GET registros:', error);

    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
});

// ======================================================
// POST /api/registros
// ======================================================
router.post('/', async (req, res) => {

  try {

    const {
      uid,
      displayName,
      email,
      asignatura,
      nota,
      creditos
    } = req.body;

    if (!uid || !asignatura || nota === undefined || !creditos) {
      return res.status(400).json({
        error: 'Faltan campos obligatorios'
      });
    }

    const nuevoRegistro = new Registro({
      uid,
      displayName: displayName || '',
      email: email || '',
      asignatura,
      nota: Number(nota),
      creditos: Number(creditos)
    });

    const guardado = await nuevoRegistro.save();

    res.status(201).json({
      ok: true,
      id: guardado._id,
      message: 'Registro guardado correctamente'
    });

  } catch (error) {

    console.error('❌ Error POST registros:', error);

    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
});

// ======================================================
// DELETE /api/registros/:id
// ======================================================
router.delete('/:id', async (req, res) => {

  try {

    const eliminado = await Registro.findByIdAndDelete(req.params.id);

    if (!eliminado) {
      return res.status(404).json({
        error: 'Registro no encontrado'
      });
    }

    res.json({
      ok: true,
      message: 'Registro eliminado correctamente'
    });

  } catch (error) {

    console.error('❌ Error DELETE registros:', error);

    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
});

module.exports = router;