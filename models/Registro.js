const mongoose = require('mongoose');

// ============================================================
//  Modelo Registro — equivalente a la tabla registros en MySQL
// ============================================================
const RegistroSchema = new mongoose.Schema({

  uid: {
    type: String,
    required: [true, 'El UID del usuario es obligatorio'],
    index: true
  },

  displayName: {
    type: String,
    default: ''
  },

  email: {
    type: String,
    default: ''
  },

  asignatura: {
    type: String,
    required: [true, 'La asignatura es obligatoria'],
    trim: true
  },

  nota: {
    type: Number,
    required: [true, 'La nota es obligatoria'],
    min: [0, 'La nota mínima es 0'],
    max: [5, 'La nota máxima es 5']
  },

  creditos: {
    type: Number,
    required: [true, 'Los créditos son obligatorios'],
    min: [1, 'Mínimo 1 crédito']
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model('Registro', RegistroSchema);
