// src/models/Vets.js
const mongoose = require('mongoose');

const vetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialties: [{ type: String, required: true }],  // Lista de especialidades
  clinic: { type: String, required: true },  // Nome da clínica
  contact: {
    phone: { type: String, required: true },  // Telefone de contato
    email: { type: String, required: true }  // Email de contato
  },
  ratings: { type: Number, min: 0, max: 5, default: 0 },  // Avaliação média
  reviews: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Relacionamento com o usuário
    rating: { type: Number, min: 0, max: 5, required: true },  // Avaliação do usuário
    comment: { type: String }  // Comentário do usuário
  }],
  availableTimes: [{
    day: { type: String, required: true },  // Dia da semana
    startTime: { type: String, required: true },  // Hora de início
    endTime: { type: String, required: true }  // Hora de término
  }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Vet', vetSchema);
