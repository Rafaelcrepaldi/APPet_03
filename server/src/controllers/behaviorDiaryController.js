const Pet = require('../models/Pet');

// Adiciona uma entrada no diário de comportamento
exports.addDiaryEntry = async (req, res) => {
    const { petId } = req.params;
    const { description } = req.body;

    try {
        const pet = await Pet.findById(petId);
        if (!pet) {
            return res.status(404).json({ message: 'Pet não encontrado' });
        }

        // Adiciona uma nova entrada no diário
        pet.behaviorDiary.push({ description });
        await pet.save();

        res.status(201).json({ message: 'Entrada adicionada com sucesso', pet });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao adicionar entrada no diário', error });
    }
};

// Lista as entradas no diário de comportamento de um pet
exports.getDiaryEntries = async (req, res) => {
    const { petId } = req.params;

    try {
        const pet = await Pet.findById(petId);
        if (!pet) {
            return res.status(404).json({ message: 'Pet não encontrado' });
        }

        res.status(200).json({ diary: pet.behaviorDiary });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar entradas do diário', error });
    }
};

// Remove uma entrada específica no diário
exports.deleteDiaryEntry = async (req, res) => {
    const { petId, entryId } = req.params;

    try {
        const pet = await Pet.findById(petId);
        if (!pet) {
            return res.status(404).json({ message: 'Pet não encontrado' });
        }

        // Remove a entrada específica no diário
        pet.behaviorDiary = pet.behaviorDiary.filter(entry => entry._id.toString() !== entryId);
        await pet.save();

        res.status(200).json({ message: 'Entrada removida com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao remover entrada do diário', error });
    }
};
