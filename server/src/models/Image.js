// iimagens dos Pets para guardar no album
const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  petId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true },  // Relacionamento com a coleção de pets
  url: { type: String, required: true },  // URL para a imagem
  type: { 
    type: String, 
    enum: ['profile', 'exam', 'other'],  // Pode ser 'profile', 'exam', 'other'
    required: true 
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Image', imageSchema);
