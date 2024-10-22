// src/routes/appointmentRoutes.js
const express = require('express');
const router = express.Router();
const AppointmentController = require('../controllers/AppointmentController');
const auth = require('../controllers/UserController');  // Middleware de autenticação

// Criar um novo agendamento (necessita autenticação)
router.post('/', auth.autentication, AppointmentController.createAppointment);

// Obter todos os agendamentos (necessita autenticação)
router.get('/', auth.autentication, AppointmentController.getAllAppointments);

// Obter um agendamento por ID (necessita autenticação)
router.get('/:id', auth.autentication, AppointmentController.getAppointmentById);

// Atualizar um agendamento por ID (necessita autenticação)
router.put('/:id', auth.autentication, AppointmentController.updateAppointment);

// Deletar um agendamento por ID (necessita autenticação)
router.delete('/:id', auth.autentication, AppointmentController.deleteAppointment);

module.exports = router;