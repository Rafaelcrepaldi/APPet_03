// src/app.js
require('dotenv').config();
const router = require('express').Router();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const config = require('./config/config');
const path = require('path');


const corsOptions = {
  origin: 'http://localhost:3000',  // Permitir requisições do seu frontend em localhost:3000
  credentials: true,  // Permitir envio de credenciais (cookies, headers de autenticação)
};

app.use(cors(corsOptions)); // Habilitar CORS para todas as rotas
// Middleware para processar JSON
app.use(express.json()); // Isso é essencial para req.body funcionar

// Middleware para processar dados enviados através de forms (caso necessário)
app.use(express.urlencoded({ extended: true }));


// Conectando ao MongoDB
mongoose.connect(config.db.uri)
  .then(() => console.log('MongoDB conectado'))
  .catch((err) => console.error('Erro ao conectar ao MongoDB', err));

// Express Session Middleware
app.get('/dados', async (req, res) => {
  try {
    // Aqui você faria uma query para buscar os dados do MongoDB
    const collection = mongoose.connection.collection('Juca_01');
    const data = await collection.find().toArray();
    res.json(data);
  } catch (err) {
    res.status(500).send('Erro ao buscar os dados');
  }
});

app.get('/api/data', (req, res) => {
  res.json({ message: 'Aqui estão os dados!' });
});

// Rotas
const petRoutes = require('./routes/petRoutes');
const usersRoutes = require('./routes/usersRoutes');
const medicalHistoryRoutes = require('./routes/medicalHistoryRoutes');
const imageRoutes = require('./routes/imageRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const vetRoutes = require('./routes/vetRoutes');
const productRoutes = require('./routes/productRoutes');
const middleware = require('./Middleware/middleware');
const behaviorDiaryRoutes = require('./routes/behaviorDiaryRoutes');

app.use('/uploads', express.static(path.join(__dirname, './uploads/images')));
app.use('/api/pets', petRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/medicalHistory', medicalHistoryRoutes);
app.use('/api/images', imageRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/vets', vetRoutes);
app.use('/api/products', productRoutes);
app.use('/api/auth', middleware);
app.use('/api/diario', behaviorDiaryRoutes);

// Iniciando o servidor
const port = config.port || 4000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});