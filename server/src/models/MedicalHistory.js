// src/models/MedicalHistory.js
const mongoose = require('mongoose');

const medicalHistorySchema = new mongoose.Schema({
  petId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true },  // Relacionamento com a coleção de pets
  vetName: { type: String, required: true },
  clinic: { type: String, required: true },
  date: { type: Date, default: Date.now },
  description: { type: String, required: true },
  prescriptions: [{
    medicine: { type: String, required: true },
    dosage: { type: String, required: true }
  }],
  examResults: { type: String },  // URL para o resultado do exame
  notes: { type: String }  // Notas adicionais sobre a consulta ou o exame
});

module.exports = mongoose.model('MedicalHistory', medicalHistorySchema);
