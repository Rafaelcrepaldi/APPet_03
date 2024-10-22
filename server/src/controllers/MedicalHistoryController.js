// src/controllers/MedicalHistoryController.js
const MedicalHistory = require('../models/MedicalHistory')

// Criar um novo registro de histórico médico
exports.createMedicalHistory = async (req, res) => {
  try {
    const { petId, vetName, clinic, date, description, prescriptions, examResults, notes } = req.body

    const newMedicalHistory = new MedicalHistory({
      petId,
      vetName,
      clinic,
      date,
      description,
      prescriptions,
      examResults,
      notes,
    })

    await newMedicalHistory.save()
    res.status(201).json({ message: 'Histórico médico criado com sucesso.', medicalHistory: newMedicalHistory })
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar o histórico médico.', error })
  }
}

// Obter todos os registros de histórico médico de um pet
exports.getMedicalHistoryByPetId = async (req, res) => {
  try {
    const medicalHistory = await MedicalHistory.find({ petId: req.params.petId })
    res.status(200).json(medicalHistory)
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar o histórico médico do pet.', error })
  }
}

// Atualizar um registro de histórico médico
exports.updateMedicalHistory = async (req, res) => {
  try {
    const { vetName, clinic, date, description, prescriptions, examResults, notes } = req.body
    const medicalHistory = await MedicalHistory.findById(req.params.id)

    if (!medicalHistory) {
      return res.status(404).json({ message: 'Histórico médico não encontrado.' })
    }

    medicalHistory.vetName = vetName || medicalHistory.vetName
    medicalHistory.clinic = clinic || medicalHistory.clinic
    medicalHistory.date = date || medicalHistory.date
    medicalHistory.description = description || medicalHistory.description
    medicalHistory.prescriptions = prescriptions || medicalHistory.prescriptions
    medicalHistory.examResults = examResults || medicalHistory.examResults
    medicalHistory.notes = notes || medicalHistory.notes

    await medicalHistory.save()
    res.status(200).json({ message: 'Histórico médico atualizado com sucesso.', medicalHistory })
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar o histórico médico.', error })
  }
}

// Deletar um registro de histórico médico
exports.deleteMedicalHistory = async (req, res) => {
  try {
    const medicalHistory = await MedicalHistory.findByIdAndDelete(req.params.id)
    if (!medicalHistory) {
      return res.status(404).json({ message: 'Histórico médico não encontrado.' })
    }
    res.status(200).json({ message: 'Histórico médico deletado com sucesso.' })
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar o histórico médico.', error })
  }
}