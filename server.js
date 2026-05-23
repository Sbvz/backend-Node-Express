require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();

// ======================================================
// CORS TOTAL
// ======================================================
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});

app.use(cors());
app.use(express.json());

// ======================================================
// MongoDB
// ======================================================
const conectarDB = require('./config/db');

conectarDB();

// ======================================================
// Rutas
// ======================================================
app.use('/api/registros', require('./routes/registros'));

// ======================================================
// Ruta principal
// ======================================================
app.get('/', (req, res) => {
  res.json({
    ok: true,
    message: 'Backend funcionando correctamente'
  });
});

// ======================================================
// Middleware de errores
// ======================================================
app.use((err, req, res, next) => {
  console.error('ERROR GLOBAL:', err);

  res.status(500).json({
    ok: false,
    error: err.message
  });
});

// ======================================================
// Servidor
// ======================================================
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});