// src/controllers/ImageController.js
const Image = require('../models/Image')

// Adicionar uma nova imagem ao pet
exports.addImage = async (req, res) => {
  try {
    const { petId, url, type } = req.body

    const newImage = new Image({
      petId,
      url,
      type,
    })

    await newImage.save()
    res.status(201).json({ message: 'Imagem adicionada com sucesso.', image: newImage })
  } catch (error) {
    res.status(500).json({ message: 'Erro ao adicionar a imagem.', error })
  }
}

// Obter todas as imagens de um pet
exports.getImagesByPetId = async (req, res) => {
  try {
    const images = await Image.find({ petId: req.params.petId })
    res.status(200).json(images)
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar imagens do pet.', error })
  }
}

// Atualizar uma imagem
exports.updateImage = async (req, res) => {
  try {
    const { url, type } = req.body
    const image = await Image.findById(req.params.id)

    if (!image) {
      return res.status(404).json({ message: 'Imagem não encontrada.' })
    }

    image.url = url || image.url
    image.type = type || image.type

    await image.save()
    res.status(200).json({ message: 'Imagem atualizada com sucesso.', image })
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar a imagem.', error })
  }
}

// Deletar uma imagem
exports.deleteImage = async (req, res) => {
  try {
    const image = await Image.findByIdAndDelete(req.params.id)
    if (!image) {
      return res.status(404).json({ message: 'Imagem não encontrada.' })
    }
    res.status(200).json({ message: 'Imagem deletada com sucesso.' })
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar a imagem.', error })
  }
}