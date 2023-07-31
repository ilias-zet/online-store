const mongoose = require('mongoose');

const Schema = mongoose.Schema;

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

module.exports = Product;