require('dotenv').config();
const express    = require('express');
const cors       = require('cors');
const conectarDB = require('./config/db');

// ── Conectar a MongoDB ────────────────────────────────────
conectarDB();

const app  = express();
const PORT = process.env.PORT || 4000;

// ── Middlewares ───────────────────────────────────────────
app.use(cors({
  origin: [
    'http://localhost:4200',
    process.env.FRONTEND_URL
  ],
  methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// ── Rutas ─────────────────────────────────────────────────
app.use('/api/registros', require('./routes/registros'));

// Ruta de verificación
app.get('/', (req, res) => {
  res.json({ message: '✅ Backend MEAN - Rendimiento Académico funcionando' });
});

// ── Iniciar servidor ──────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});