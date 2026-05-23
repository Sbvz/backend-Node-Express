require('dotenv').config();

const express = require('express');
const cors = require('cors');
const conectarDB = require('./config/db');

const app = express();

// ======================================================
// Conectar MongoDB
// ======================================================
conectarDB();

// ======================================================
// Middlewares
// ======================================================
app.use(express.json());

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// ======================================================
// Ruta principal
// ======================================================
app.get('/', (req, res) => {
  res.json({
    mensaje: '✅ Backend funcionando correctamente'
  });
});

// ======================================================
// Rutas API
// ======================================================
app.use('/api/registros', require('./routes/registros'));

// ======================================================
// Puerto
// ======================================================
const PORT = process.env.PORT || 4000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});