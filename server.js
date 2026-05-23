require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();

// ======================================================
// CONEXIÓN MONGODB
// ======================================================
const conectarDB = require('./config/db');

conectarDB();

// ======================================================
// CORS MANUAL
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

  // Responder preflight OPTIONS
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});

// ======================================================
// MIDDLEWARES
// ======================================================
app.use(cors());

app.use(express.json());

// ======================================================
// RUTAS
// ======================================================
app.use('/api/registros', require('./routes/registros'));

// ======================================================
// RUTA PRINCIPAL
// ======================================================
app.get('/', (req, res) => {

  res.json({
    ok: true,
    message: '✅ Backend funcionando correctamente'
  });

});

// ======================================================
// MANEJO GLOBAL DE ERRORES
// ======================================================
app.use((err, req, res, next) => {

  console.error('❌ ERROR GLOBAL:', err);

  res.status(500).json({
    ok: false,
    error: err.message
  });

});

// ======================================================
// INICIAR SERVIDOR
// ======================================================
const PORT = process.env.PORT || 4000;

try {

  app.listen(PORT, '0.0.0.0', () => {

    console.log(`🚀 Servidor corriendo en puerto ${PORT}`);

  });

} catch (error) {

  console.error('❌ ERROR AL INICIAR SERVIDOR:', error);

}