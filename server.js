require('dotenv').config();

const express = require('express');
const cors = require('cors');

const conectarDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 4000;

// =========================
// Conectar MongoDB
// =========================
conectarDB();

// =========================
// Middlewares
// =========================
app.use(express.json());

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// =========================
// Ruta principal
// =========================
app.get('/', (req, res) => {
  res.json({
    ok: true,
    message: '✅ Backend funcionando correctamente'
  });
});

// =========================
// Rutas API
// =========================
app.use('/api/registros', require('./routes/registros'));

// =========================
// Middleware de errores
// =========================
app.use((err, req, res, next) => {
  console.error('❌ Error del servidor:', err);

  res.status(500).json({
    ok: false,
    error: err.message
  });
});

// =========================
// Iniciar servidor
// =========================
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});