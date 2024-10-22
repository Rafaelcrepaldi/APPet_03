// src/controllers/AppointmentController.js
const Appointment = require('../models/Appointment');

// Criar um novo agendamento
exports.createAppointment = async (req, res) => {
  try {
    const { petId, vetId, date, time, type, notes } = req.body;

    const newAppointment = new Appointment({
      petId,
      vetId,
      date,
      time,
      type,
      notes,
    });

    await newAppointment.save();
    res.status(201).json({ message: 'Agendamento criado com sucesso.', appointment: newAppointment });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar o agendamento.', error });
  }
};

// Obter todos os agendamentos
exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().populate('petId').populate('vetId');
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar agendamentos.', error });
  }
};

// Obter um agendamento por ID
exports.getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id).populate('petId').populate('vetId');
    if (!appointment) {
      return res.status(404).json({ message: 'Agendamento não encontrado.' });
    }
    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar o agendamento.', error });
  }
};

// Atualizar um agendamento
exports.updateAppointment = async (req, res) => {
  try {
    const { date, time, type, status, notes } = req.body;
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: 'Agendamento não encontrado.' });
    }

    appointment.date = date || appointment.date;
    appointment.time = time || appointment.time;
    appointment.type = type || appointment.type;
    appointment.status = status || appointment.status;
    appointment.notes = notes || appointment.notes;

    await appointment.save();
    res.status(200).json({ message: 'Agendamento atualizado com sucesso.', appointment });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar o agendamento.', error });
  }
};

// Deletar um agendamento
exports.deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: 'Agendamento não encontrado.' });
    }
    res.status(200).json({ message: 'Agendamento deletado com sucesso.' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar o agendamento.', error });
  }
};