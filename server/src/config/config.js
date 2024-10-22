// src/config/config.js
require('dotenv').config();  // Carrega as variáveis de ambiente do .env

module.exports = {
  db: {
    uri: process.env.MONGO_URI || 'mongodb://localhost:27017/Juca_01',  // Configuração do MongoDB
  },
  jwtSecret: process.env.JWT_SECRET || 'uma_chave_super_secreta',  // Chave JWT
  port: process.env.PORT || 4000  // Porta do servidor
};
