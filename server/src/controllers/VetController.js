// src/controllers/VetController.js
const Vet = require('../models/Vet')

// Criar um novo veterinário
exports.createVet = async (req, res) => {
  try {
    const { name, specialties, clinic, contact, availableTimes } = req.body

    const newVet = new Vet({
      name,
      specialties,
      clinic,
      contact,
      availableTimes,
    })

    await newVet.save()
    res.status(201).json({ message: 'Veterinário criado com sucesso.', vet: newVet })
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar o veterinário.', error })
  }
}

// Obter todos os veterinários
exports.getAllVets = async (req, res) => {
  try {
    const vets = await Vet.find()
    res.status(200).json(vets)
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar veterinários.', error })
  }
}

// Obter um veterinário por ID
exports.getVetById = async (req, res) => {
  try {
    const vet = await Vet.findById(req.params.id)
    if (!vet) {
      return res.status(404).json({ message: 'Veterinário não encontrado.' })
    }
    res.status(200).json(vet)
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar o veterinário.', error })
  }
}

// Atualizar um veterinário
exports.updateVet = async (req, res) => {
  try {
    const { name, specialties, clinic, contact, availableTimes } = req.body
    const vet = await Vet.findById(req.params.id)

    if (!vet) {
      return res.status(404).json({ message: 'Veterinário não encontrado.' })
    }

    vet.name = name || vet.name
    vet.specialties = specialties || vet.specialties
    vet.clinic = clinic || vet.clinic
    vet.contact = contact || vet.contact
    vet.availableTimes = availableTimes || vet.availableTimes

    await vet.save()
    res.status(200).json({ message: 'Veterinário atualizado com sucesso.', vet })
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar o veterinário.', error })
  }
}

// Deletar um veterinário
exports.deleteVet = async (req, res) => {
  try {
    const vet = await Vet.findByIdAndDelete(req.params.id)
    if (!vet) {
      return res.status(404).json({ message: 'Veterinário não encontrado.' })
    }
    res.status(200).json({ message: 'Veterinário deletado com sucesso.' })
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar o veterinário.', error })
  }
}
