const Product = require('../models/Product');
const User = require('../models/User');
const moment = require('moment');
const productService = require('../services/productService');

// Função de validação dos dados do produto
const validateProductData = ({ title, price, description, city, category, image }) => {
    let errors = [];
    if (title.length < 3 || title.length > 50) errors.push('O título deve ter entre 3 e 50 caracteres.');
    if (isNaN(Number(price))) errors.push('O preço deve ser um número.');
    if (description.length < 10 || description.length > 1000) errors.push('A descrição deve ter entre 10 e 1000 caracteres.');
    if (!/^[A-Za-z]+$/.test(city)) errors.push('A cidade deve conter apenas letras.');
    if (image && !image.includes('image')) errors.push('O arquivo enviado deve ser uma imagem válida.');
    if (!category) errors.push('A categoria é obrigatória.');
    return errors;
};

// Obter produtos com paginação e busca
exports.getProducts = async (req, res) => {
    const { page, search } = req.query;
    try {
        let products;
        if (search) {
            products = await Product.find();
            products = products.filter(x => x.active);
            products = products.filter(x => x.title.toLowerCase().includes(search.toLowerCase()) || x.city.toLowerCase().includes(search.toLowerCase()));
            res.status(200).json({ products: products, pages: products.pages });
        } else {
            products = await Product.paginate({}, { page: parseInt(page) || 1, limit: 5 });
            products.docs = products.docs.filter(x => x.active);
            res.status(200).json({ products: products.docs, pages: products.pages });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obter produtos por categoria
exports.getProductsByCategory = async (req, res) => {
    const { page } = req.query;
    try {
        let products = await Product.paginate({ category: req.params.category }, { page: parseInt(page) || 1, limit: 10 });
        res.status(200).json({ products: products.docs, pages: products.pages });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obter detalhes específicos de um produto
exports.getProductById = async (req, res) => {
    try {
        let product = await Product.findById(req.params.id).lean();
        if (!product) {
            return res.status(404).json({ message: 'Produto não encontrado.' });
        }

        let seller = await User.findById(product.seller).lean();
        if (!seller) {
            return res.status(404).json({ message: 'Vendedor não encontrado.' });
        }

        product.addedAt = moment(product.addedAt).format('D MMM YYYY (dddd) HH:mm');

        let jsonRes = {
            ...product,
            name: seller.name,
            phoneNumber: seller.phoneNumber,
            email: seller.email,
            createdSells: seller.createdSells.length,
            avatar: seller.avatar,
            sellerId: seller._id,
            isAuth: !!req.user
        };

        if (req.user) {
            let user = await User.findById(req.user._id);
            jsonRes.isSeller = req.user._id.equals(product.seller);
            jsonRes.isWished = user.wishedProducts.includes(req.params.id);
        }

        res.status(200).json(jsonRes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Criar um novo produto
exports.createProduct = async (req, res) => {
    const { title, price, description, city, category, stock } = req.body;

    try {
        console.log('Dados recebidos do formulário:', req.body);
        console.log('Arquivo recebido:', req.file); // Verificar se a imagem foi recebida corretamente

        // Validação dos dados
        let errors = validateProductData({ title, price, description, city, category });
        if (errors.length) throw { message: errors };

        // Verifica se uma imagem foi enviada
        let imagePath = req.file ? `/uploads/images/${req.file.filename}` : null;
        console.log('Caminho da imagem:', imagePath);

        if (!imagePath) {
            return res.status(400).json({ message: 'A imagem é obrigatória.' });
        }

        // Criação do produto no banco de dados
        let product = new Product({
            title,
            price,
            description,
            city,
            category,
            image: imagePath,
            stock,
            addedAt: new Date(),
        });

        await product.save();
        await productService.userCollectionUpdate(req.user.id, product); // Atualizar a coleção de produtos do usuário

        res.status(201).json({ productId: product.id });
    } catch (error) {
        console.error('Erro ao criar o produto:', error); // Verificar o que está causando o erro
        res.status(500).json({ message: error.message });
    }
};
// Editar um produto
exports.editProduct = async (req, res) => {
    const { title, price, description, city, category, image } = req.body;
    try {
        let product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Produto não encontrado.' });
        }

        if (req.user.id.toString() !== product.seller.toString()) {
            throw { message: 'Você não tem permissão para editar este produto.' };
        }

        let errors = validateProductData({ title, price, description, city, category, image });
        if (errors.length) throw { message: errors };

        if (image) {
            let compressedImg = await productService.uploadImage(image);
            product.image = compressedImg;
        }
        Object.assign(product, { title, price, description, city, category });

        await product.save();
        res.status(200).json({ message: 'Produto atualizado com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Ativar ou arquivar produto
exports.toggleProductStatus = async (req, res, status) => {
    try {
        let product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Produto não encontrado.' });
        }

        await Product.updateOne({ _id: req.params.id }, { active: status });
        res.status(200).json({ message: status ? 'Ativado' : 'Arquivado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Adicionar ou remover produto da wishlist
exports.toggleWishProduct = async (req, res) => {
    try {
        let user = await User.findById(req.user.id);
        const isWished = user.wishedProducts.includes(req.params.id);

        await User.updateOne({ _id: req.user.id }, { [isWished ? '$pull' : '$push']: { wishedProducts: req.params.id } });
        await Product.updateOne({ _id: req.params.id }, { [isWished ? '$pull' : '$push']: { likes: req.user._id } });

        res.status(200).json({ message: isWished ? 'Removido da lista de desejos' : 'Adicionado à lista de desejos' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obter produtos da wishlist
exports.getWishlist = async (req, res) => {
    try {
        let user = await User.findById(req.user.id).populate('wishedProducts').lean();
        res.status(200).json({ wishlist: user.wishedProducts });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
