const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  // userId: {
  //   type: Number,
  //   required: true,
  // },
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

const Product = mongoose.model('User', userSchema, 'users')

module.exports = Product;