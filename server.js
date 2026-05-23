require('dotenv').config();

const express = require('express');
const cors = require('cors');
const conectarDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 4000;

// Conectar MongoDB
conectarDB();

// ==========================
// CORS TOTAL
// ==========================

app.use(cors());

app.options('*', cors());

// ==========================
// Middlewares
// ==========================

app.use(express.json());

// ==========================
// Ruta prueba
// ==========================

app.get('/', (req, res) => {
  res.json({
    message: '✅ Backend funcionando correctamente'
  });
});

// ==========================
// Rutas API
// ==========================

app.use('/api/registros', require('./routes/registros'));

// ==========================
// Iniciar servidor
// ==========================

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});