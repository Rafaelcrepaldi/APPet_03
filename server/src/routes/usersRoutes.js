// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const auth = require('../controllers/UserController');  // Middleware de autenticação

router.post('/register', UserController.CreateUser)
// Obter todos os usuários (necessita autenticação)
router.get('/', auth.autentication, UserController.getAllUsers);

// Obter um usuário por ID (necessita autenticação)
router.get('/:id', auth.autentication, UserController.getUserById);

// Atualizar um usuário por ID (necessita autenticação)
router.put('/:id', auth.autentication, UserController.updateUser);

// Deletar um usuário por ID (necessita autenticação)
router.delete('/:id', auth.autentication, UserController.deleteUser);

// Login do usuário
router.post('/login', UserController.loginUser);

// Rota para obter os pets de um usuário específico
router.get('/:id/pets', UserController.getUserPets);

router.post('/logout', UserController.logout);


module.exports = router;