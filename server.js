require('dotenv').config();

const express = require('express');
const cors = require('cors');
const conectarDB = require('./config/db');

const app = express();

conectarDB();

// ======================
// CORS MANUAL
// ======================

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

// ======================
// RUTAS
// ======================

app.get('/', (req, res) => {
  res.json({
    message: '✅ Backend funcionando correctamente'
  });
});

app.use('/api/registros', require('./routes/registros'));

// ======================
// SERVER
// ======================

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});