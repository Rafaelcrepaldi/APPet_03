const express = require('express');
const router = express.Router();
const behaviorDiaryController = require('../controllers/behaviorDiaryController');

// Adicionar uma nova entrada no diário de comportamento de um pet
router.post('/:petId/diary', behaviorDiaryController.addDiaryEntry);

// Listar todas as entradas no diário de comportamento de um pet
router.get('/:petId/diary', behaviorDiaryController.getDiaryEntries);

// Deletar uma entrada específica no diário de comportamento de um pet
router.delete('/:petId/diary/:entryId', behaviorDiaryController.deleteDiaryEntry);

module.exports = router;
