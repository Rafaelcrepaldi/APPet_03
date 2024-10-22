const Pet = require('../models/Pet');

// Função para criar um novo pet
exports.createPet = async (req, res) => {
    try {
        const newPet = new Pet(req.body);
        const savedPet = await newPet.save();
        res.status(201).json(savedPet);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar o pet', error });
    }
};

// Função para listar os pets de um usuário
exports.getPetsByUser = async (req, res) => {
    try {
        const pets = await Pet.find({ ownerId: req.user._id });
        res.status(200).json(pets);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao obter os pets', error });
    }
};

// Função para obter detalhes de um pet específico
exports.getPetById = async (req, res) => {
    try {
        const pet = await Pet.findById(req.params.petId);
        if (!pet) {
            return res.status(404).json({ message: 'Pet não encontrado' });
        }
        res.status(200).json(pet);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao obter o pet', error });
    }
};

// Função para atualizar um pet
exports.updatePet = async (req, res) => {
    try {
        const updatedPet = await Pet.findByIdAndUpdate(req.params.petId, req.body, { new: true });
        if (!updatedPet) {
            return res.status(404).json({ message: 'Pet não encontrado' });
        }
        res.status(200).json(updatedPet);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar o pet', error });
    }
};

// Função para deletar um pet
exports.deletePet = async (req, res) => {
    try {
        const deletedPet = await Pet.findByIdAndDelete(req.params.petId);
        if (!deletedPet) {
            return res.status(404).json({ message: 'Pet não encontrado' });
        }
        res.status(200).json({ message: 'Pet deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar o pet', error });
    }
};
