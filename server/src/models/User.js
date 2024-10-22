const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: { type: String, unique: true, default: () => new mongoose.Types.ObjectId() }, // Gera um ID exclusivo
  name: {
    type: String,
    trim: true,
    required: [true, 'Please fill a name. It can be your real one or a username.']
  },

  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: [true, 'Email address is required'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },

  password: {
    type: String,
    trim: true,
    required: [true, 'Password is required'],
  },

  phone: { 
    type: String,
    trim: true,
    required: [true, 'Phone number is required'],
  },

  gender: {
    type: String,
    trim: true,
    default: 'Not specified'
  },

  profile_image: { 
    type: String,
    default: 'https://res.cloudinary.com/silenceiv/image/upload/q_auto:eco/v1617358367/defaultAvatar_wnoogh.png'
  },

  pets: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Pet' 
  }],
  

  address: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    zip_code: { type: String }
  },

  createdSells: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    }
  ],

  wishedProducts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    }
  ],

  chatRooms: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ChatRoom'
    }
  ]
}, { timestamps: true }); // timestamps adiciona automaticamente createdAt e updatedAt


module.exports = mongoose.model('User', userSchema);
