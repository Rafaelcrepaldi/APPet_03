// Gerencia agendamentos de consultas veterinárias.
const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  petId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true },  // Relacionamento com o pet
  vetId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vet', required: true },  // Relacionamento com o veterinário
  date: { type: Date, required: true },  // Data da consulta
  time: { type: String, required: true },  // Hora da consulta
  type: { 
    type: String, 
    enum: ['Consulta Presencial', 'Consulta Online'],  // Tipo de consulta
    required: true 
  },
  status: { 
    type: String, 
    enum: ['Agendada', 'Cancelada', 'Concluída'],  // Status da consulta
    default: 'Agendada' 
  },
  notes: { type: String },  // Notas sobre a consulta
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Appointment', appointmentSchema);
