const express = require('express');
const { Product } = require('../models')
const router = express.Router();

// Get all products by a category
router.get('/getProducts',async (request, response) => {
  const { category } = request.query
  let products = await Product.find({"main_category":category}).limit(100)
  response.json(products)
})

// Get all information about a product. The return value - product
router.get('/getFullProduct',async (request, response) => {
  const { product_id } = request.query
  let product = await Product.find({"_id":product_id})
  response.json(product)
})

module.exports = router;