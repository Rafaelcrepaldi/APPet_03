const express = require('express');
const router = express.Router();
const petController = require('../controllers/PetController');

// Definição das rotas
router.post('/', petController.createPet);
router.get('/', petController.getPetsByUser);
router.get('/:petId', petController.getPetById);
router.put('/:petId', petController.updatePet);
router.delete('/:petId', petController.deletePet);

module.exports = router;
