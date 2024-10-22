// src/config/passportConfig.js
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
      try {
        // Verificar se o usuário existe
        const user = await User.findOne({ email: email });
        if (!user) {
          return done(null, false, { message: 'Este email não está registrado' });
        }

        // Verificar a senha com bcrypt
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Senha incorreta' });
        }
      } catch (err) {
        return done(err);
      }
    })
  );

  // Serializar o usuário para salvar na sessão
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // Desserializar o usuário com base no ID armazenado na sessão
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
