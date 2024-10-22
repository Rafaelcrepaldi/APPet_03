const Product = require('../models/Product');
const User = require('../models/User');
const fs = require('fs');
const path = require('path');

// Função para obter todos os produtos com paginação
async function getAll(page, limit) {
    return await Product.paginate({}, { page, limit });
}

// Função para encontrar produtos por categoria
async function findByCategory(category, page, limit) {
    return await Product.paginate({ category }, { page, limit });
}

// Função para encontrar um produto por ID
async function findById(id) {
    return await Product.findById(id).populate('seller').lean();
}

// Função para editar um produto
async function edit(id, data) {
    return await Product.updateOne({ _id: id }, data);
}

// Função para criar um novo produto
async function create(data, userId) {
    let product = new Product({
        ...data,
    });
    await product.save();

    return await User.updateOne({ _id: userId }, { $push: { createdSells: product } });
}

// Função de upload de imagem (armazenando localmente)
async function uploadImage(image) {
    try {
        // Caminho onde as imagens serão salvas localmente
        const uploadPath = path.join(__dirname, '..', 'uploads', 'images');
        
        // Verifica se o diretório existe, se não, cria o diretório
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
            console.log(`Diretório criado em: ${uploadPath}`);
        } else {
            console.log(`Diretório já existe: ${uploadPath}`);
        }
        

        // Definindo nome único para a imagem
        const imageName = `${Date.now()}_${image.originalname}`;
        const imagePath = path.join(uploadPath, imageName);

        // Salvando a imagem no diretório definido
        fs.writeFileSync(imagePath, image.buffer);

        // Retornando a URL da imagem para ser usada no produto
        return `/uploads/images/${imageName}`;
    } catch (error) {
        throw new Error('Erro ao fazer upload da imagem.');
    }
}

// Função para atualizar a coleção de produtos de um usuário
async function userCollectionUpdate(userId, product) {
    return await User.updateOne({ _id: userId }, { $push: { createdSells: product } });
}

// Função para encontrar um usuário por ID
async function findUserById(id) {
    return await User.findById(id);
}

module.exports = {
    create,
    getAll,
    findByCategory,
    findById,
    edit,
    uploadImage,
    userCollectionUpdate,
    findUserById
};
