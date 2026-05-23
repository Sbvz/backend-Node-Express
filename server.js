require('dotenv').config();

const express = require('express');
const cors = require('cors');
const conectarDB = require('./config/db');

const app = express();

// =============================
// Conectar MongoDB
// =============================
conectarDB();

// =============================
// Middlewares
// =============================
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// =============================
// Ruta principal
// =============================
app.get('/', (req, res) => {
  res.json({
    message: '✅ Backend funcionando correctamente'
  });
});

// =============================
// Rutas API
// =============================
app.use('/api/registros', require('./routes/registros'));

// =============================
// Puerto
// =============================
const PORT = process.env.PORT || 4000;

// =============================
// Iniciar servidor
// =============================
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});