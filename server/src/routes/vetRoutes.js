
const express = require('express');
const router = express.Router();
const VetController = require('../controllers/VetController');
const auth = require('../controllers/UserController');  // Middleware de autenticação

// Criar um novo veterinário (necessita autenticação)
router.post('/', auth.autentication, VetController.createVet);

// Obter todos os veterinários (necessita autenticação)
router.get('/', auth.autentication, VetController.getAllVets);

// Obter um veterinário por ID (necessita autenticação)
router.get('/:id', auth.autentication, VetController.getVetById);

// Atualizar um veterinário por ID (necessita autenticação)
router.put('/:id', auth.autentication, VetController.updateVet);

// Deletar um veterinário por ID (necessita autenticação)
router.delete('/:id', auth.autentication, VetController.deleteVet);

module.exports = router;