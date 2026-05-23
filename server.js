require('dotenv').config();

const express = require('express');
const cors = require('cors');

const conectarDB = require('./config/db');

const app = express();

// ======================================================
// CONECTAR MONGODB
// ======================================================
conectarDB();

// ======================================================
// CORS
// ======================================================
app.use(cors({
  origin: '*'
}));

// ======================================================
// MIDDLEWARES
// ======================================================
app.use(express.json());

// ======================================================
// RUTAS
// ======================================================
const registrosRoutes = require('./routes/registros');

app.use('/api/registros', registrosRoutes);

// ======================================================
// RUTA PRINCIPAL
// ======================================================
app.get('/', (req, res) => {
  res.json({
    ok: true,
    mensaje: 'Backend funcionando correctamente'
  });
});

// ======================================================
// PUERTO
// ======================================================
const PORT = process.env.PORT || 4000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});