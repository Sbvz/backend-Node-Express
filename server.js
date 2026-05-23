require('dotenv').config();

const express = require('express');
const cors = require('cors');
const conectarDB = require('./config/db');

const app = express();

// Conectar MongoDB
conectarDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/registros', require('./routes/registros'));

// Ruta principal
app.get('/', (req, res) => {
  res.status(200).json({
    ok: true,
    mensaje: 'Backend funcionando correctamente'
  });
});

// Puerto
const PORT = process.env.PORT || 4000;

// IMPORTANTE PARA RAILWAY
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});