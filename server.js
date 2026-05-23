require('dotenv').config();
const express = require('express');
const cors = require('cors');
const conectarDB = require('./config/db');

// Conectar MongoDB
conectarDB();

const app = express();
const PORT = process.env.PORT || 4000;

// CORS
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Rutas
app.use('/api/registros', require('./routes/registros'));

// Ruta principal
app.get('/', (req, res) => {
  res.json({ message: '✅ Backend funcionando correctamente' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});