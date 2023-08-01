const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  surName: {
    type: String,
    required: true,
  },

  pass: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const productSchema = new Schema({
    ProductId: {
        type: Number,
        required: true,
    },
    Gender: {
        type: String,
        required: true,
    },
    Category: {
        type: String,
        required: true,
    },
    SubCategory: String,
    ProductType: String,
    Colour: String,
    Usage: String,
    ProductTitle: String,
    Image: String,
    ImageURL: String,

});

const Product = mongoose.model('Product', productSchema, 'products')
const User = mongoose.model('User', userSchema, 'users')

module.exports = Product;
module.exports = User;