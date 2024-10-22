// src/routes/imageRoutes.js
const express = require('express');
const router = express.Router();
const ImageController = require('../controllers/ImageController');
const auth = require('../controllers/UserController');  // Middleware de autenticação

// Adicionar uma nova imagem ao pet (necessita autenticação)
router.post('/', auth.autentication, ImageController.addImage);

// Obter todas as imagens de um pet (necessita autenticação)
router.get('/pet/:petId', auth.autentication, ImageController.getImagesByPetId);

// Atualizar uma imagem por ID (necessita autenticação)
router.put('/:id', auth.autentication, ImageController.updateImage);

// Deletar uma imagem por ID (necessita autenticação)
router.delete('/:id', auth.autentication, ImageController.deleteImage);

module.exports = router;