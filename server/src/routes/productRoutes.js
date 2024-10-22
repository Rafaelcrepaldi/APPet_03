const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const ProductController = require('../controllers/ProductController');
const auth = require('../controllers/UserController'); // Middleware de autenticação

// Função para garantir que o diretório de uploads exista
const ensureUploadDirExists = () => {
    const uploadDir = path.join(__dirname, '..', 'uploads', 'images');
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }
};

// Configuração do `multer` para upload de arquivos
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        ensureUploadDirExists(); // Garante que o diretório existe antes de salvar
        cb(null, path.join(__dirname, '..', 'uploads', 'images')); // Define o diretório onde as imagens serão salvas
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname); // Define um nome único para o arquivo
    }
});

const fileFilter = (req, file, cb) => {
    // Aceitar apenas arquivos de imagem
    if (file.mimetype.startsWith('image/')) {
        cb(null, true); // Aceita o arquivo
    } else {
        cb(new Error('Arquivo inválido, apenas imagens são permitidas'), false); // Rejeita o arquivo
    }
};

const upload = multer({ storage, fileFilter });

// Rotas para produtos
router.get('/', ProductController.getProducts);
router.get('/:category', ProductController.getProductsByCategory);
router.get('/specific/:id', ProductController.getProductById);

// Rotas que requerem autenticação e permitem upload de imagens
router.post('/create', auth.autentication, upload.single('image'), ProductController.createProduct);
router.put('/edit/:id', auth.autentication, upload.single('image'), ProductController.editProduct);
router.patch('/enable/:id', auth.autentication, (req, res) => ProductController.toggleProductStatus(req, res, true));
router.patch('/archive/:id', auth.autentication, (req, res) => ProductController.toggleProductStatus(req, res, false));

// Wishlist
router.post('/wish/:id', auth.autentication, ProductController.toggleWishProduct);
router.get('/wishlist', auth.autentication, ProductController.getWishlist);

module.exports = router;
