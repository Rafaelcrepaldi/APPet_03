
const User = require('../models/User')
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const ENCRYPTION_KEY = Buffer.from(process.env.ENCRYPTION_KEY, 'hex');
 // Chave de 256 bits
const IV_LENGTH = 16;


function encrypt(text) {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return `${iv.toString('hex')}:${encrypted}`;
}

function decrypt(encryptedText) {
  const [ivHex, encrypted] = encryptedText.split(':');
  const iv = Buffer.from(ivHex, 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}


// Criar um novo usuário
exports.CreateUser = async (req, res) => {
  
  const { name, email, password, phone, gender} = req.body
  // Verifica se o usuário já existe
  const existingUser = await User.findOne({ email })

  if (existingUser) {
    return res.status(400).json({ message: 'Email já está em uso.' })
  }
  // Criptografa a senha e armazena em uma variável
  const encryptedPassword = encrypt(password);

  try {

    // Cria um novo usuário com a senha criptografada
    const user = new User({
      name,
      email,
      password: encryptedPassword,
      phone,
      gender,
    });

    await user.save();
    res.status(201).json({ message: 'Usuário criado com sucesso.', user: newUser });
  } catch (error) {

    res.status(500).json({ message: 'Erro ao salvar o usuário.', error });
  }

}

exports.logout = async (req, res) => {
  res.clearCookie(COOKIE_NAME);
  res.status(200).json({ message: 'Successfully logged out' })
}

// Obter todos os usuários
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate('User')
    res.status(200).json(users)
  } catch (error) {
    console.log('Dados recebidos do formulário:', req.body);
    res.status(500).json({ message: 'Erro ao buscar usuários.', error })
  }
}

// Obter um usuário por ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('User')
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' })
    }
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar o usuário.' })
  }
}

// Atualizar um usuário
exports.updateUser = async (req, res) => {
  //TODO: Rewrite this 
  let { name, phoneNumber, email } = req.body;
  try {
      let errors = [];
      let checkUser = await User.findOne({ email });

      if (checkUser && checkUser._id.toString() !== req.user._id.toString()) errors.push('This email address is already in use; ');
      if (name.length < 3 || name.length > 50) errors.push('Name should be at least 3 characters long and max 50 characters long; ')
      if (/(\+)?(359|0)8[789]\d{1}(|-| )\d{3}(|-| )\d{3}/.test(phoneNumber) == false) errors.push('Phone number should be a valid BG number; ');
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) == false) errors.push("Please fill a valid email address; ");

      if (req.body.avatar) {
          if (!req.body.avatar.includes('image')) errors.push('The uploaded file should be an image; ');
      }

      if (errors.length >= 1) throw { message: [errors] };

      if (req.body.avatar) {
          let compressedImg = await productService.uploadImage(req.body.avatar);
          await userService.edit(req.params.id, { name, phoneNumber, email, avatar: compressedImg });
          res.status(201).json({ message: 'Updated!', avatar: compressedImg });
      } else {
          await userService.edit(req.params.id, { name, phoneNumber, email });
          res.status(201).json({ message: 'Updated!' });
      }
  } catch (err) {
      res.status(404).json({ error: err.message });
  }
}

// Deletar um usuário
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' })
    }
    res.status(200).json({ message: 'Usuário deletado com sucesso.' })
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar o usuário.', error })
  }
}
exports.getUserPets = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Verificar se o usuário existe
    const user = await User.findById(id).populate('pets');
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Retornar os pets atribuídos ao usuário
    res.status(200).json(user.pets);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar os pets do usuário', error });
  }
};
  // Login de usuário
exports.loginUser = async (req, res) => {
  const { email, password } = req.body

  // Validação
  if (!email || !password) {
    return res.status(400).json({ message: 'Por favor, preencha os campos email e senha.' })
  }

  // Verifica se o usuário existe
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(404).json({ message: 'Este email não está registrado' });
  }
  
  
  try {
    const pass = user.password
    const decryptedPassword = decrypt(pass);
    if (password !== decryptedPassword) {
      return res.status(401).json({ message: 'Senha incorreta' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao descriptografar a senha.', error });
  }
  
  try {
    const secret = process.env.JWT_SECRET;
    const user = await User.findOne({ email });
    const token = jwt.sign({ id: user.id }, secret, { expiresIn: '1d' });
    const id = user.id
    return res.status(200).json({ message: 'Autenticação realizada com sucesso', token, id });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao gerar token.', error });
  }

} 
// Middleware de autenticação
exports.autentication = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
      return res.status(401).json({ message: 'Token não fornecido.' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
      return res.status(401).json({ message: 'Token malformado.' });
  }

  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // O ID do usuário deve ser anexado ao req.user
      next();
  } catch (error) {
      return res.status(401).json({ message: 'Token inválido.' });
  }
};
