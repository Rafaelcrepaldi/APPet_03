// src/routes/medicalHistoryRoutes.js
const express = require('express');
const router = express.Router();
const MedicalHistoryController = require('../controllers/MedicalHistoryController');
const auth = require('../controllers/UserController');  // Middleware de autenticação

// Criar um novo registro de histórico médico (necessita autenticação)
router.post('/', auth.autentication, MedicalHistoryController.createMedicalHistory);

// Obter todos os registros de histórico médico de um pet (necessita autenticação)
router.get('/pet/:petId', auth.autentication, MedicalHistoryController.getMedicalHistoryByPetId);

// Atualizar um registro de histórico médico por ID (necessita autenticação)
router.put('/:id', auth.autentication, MedicalHistoryController.updateMedicalHistory);

// Deletar um registro de histórico médico por ID (necessita autenticação)
router.delete('/:id', auth.autentication, MedicalHistoryController.deleteMedicalHistory);

module.exports = router;