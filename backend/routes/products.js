const express = require('express');
const Product = require('../models')
const router = express.Router();

// const app = express();

// Get all products by a category
router.get('/getProductsByCategory',async (request, response) => {
  const { category } = request.query
  let products = await Product.find({"main_category":category}).limit(100)
  await response.json(products)
})

// Get all information about a product. The return value - product
router.get('/getProductAllInformation',async (request, response) => {
  const { product_id } = request.query
  let product = await Product.find({"_id":product_id})
  await response.json(product)
})

module.exports = router;