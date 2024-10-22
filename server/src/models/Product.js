const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    minlength: [3, 'Title should be at least 3 characters long'],
    maxlength: [50, "Title can't be more than 50 characters long"]
  },
  price: {
    type: Number,
    required: true,
    trim: true,
  },
  
  description: {
    type: String,
    trim: true,
    required: [true, 'Description is required'],
    minlength: [10, 'Description should be at least 10 characters long'],
    maxlength: [1000, 'Description should be no more than 1000 characters long']
  },
  city: {
    type: String,
    required: [true, 'City is required'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
  },

  image: [
    {
      type: String,
      required: true
    }
  ],
  
  stock: {
    type: Number,
    required: true,
    default: 0
  },


  addedAt: {
    type: Date,
    required: true,
    default: Date.now
  },

  likes: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'User'
    }
  ],

  active: {
    type: Boolean,
    default: true
  } 
});

productSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Product', productSchema);
