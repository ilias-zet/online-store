const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
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
    _id: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    description: {
      type: String,
      required: true,
    },
    gtin13: {
      type: Number,
      required: true,
    },
    availability: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    url: {
      type: String,
      required: true,
    }, 
    sku: String,
    priceCurrency: String,
    breadcrumbs: [String,String,String],
    images: String,
    crawled_at: String,
    

});

const Products = mongoose.model('Product', productSchema, 'products')
const Users = mongoose.model('User', userSchema, 'users')

module.exports = { Products, Users }