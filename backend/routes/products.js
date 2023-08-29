const express = require('express');
const { Products } = require('../models')
const router = express.Router();

// Get all products by a category
router.get('/getProducts',async (request, response) => {
  const { category } = request.query
  let products = await Products.find({"main_category":category}).limit(100)
  response.json(products)
})

// Get all information about a product. The return value - product
router.get('/getFullProduct',async (request, response) => {
  const { product_id } = request.query
  let product = await Products.findOne({"_id":product_id})
  response.json(product)
})

router.get('/getRecommendedProducts', async (req,res) => {
  const findParams = ["64987992e4498b4d8473f158","64987992e4498b4d8473f15f","64987992e4498b4d8473f15b"]
  const passFields = '-crawled_at -breadcrumbs -description -sku'
  const recProducts = await Products.find({_id:{$in: findParams}},passFields);
  res.json(recProducts)
})

module.exports = router;