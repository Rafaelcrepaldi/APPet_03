const express = require('express');
const router = express.Router();
const { autentication } = require('../controllers/UserController');

// Aplica o middleware de autenticação para rotas protegidas
router.get('/protected-route', autentication, (req, res) => {
    res.json({ message: 'Você está autenticado', user: req.user });
});

// Outros exemplos de rotas que usam o middleware de autenticação
router.post('/update-profile', autentication, (req, res) => {
    // O usuário autenticado está disponível em req.user
    const userId = req.user.id;
    // Lógica para atualizar o perfil do usuário com userId
    res.json({ message: 'Perfil atualizado com sucesso' });
});

module.exports = router;
