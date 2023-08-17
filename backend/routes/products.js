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
  let product = await Products.find({"_id":product_id})
  response.json(product)
})

router.get('/getRecommendedProducts', async (req,res) => {
  const findParams = [
    {
      _id: "64987992e4498b4d8473f158"
    },
    {
      _id: "64987992e4498b4d8473f15f"
    },
    {
      _id: "64987992e4498b4d8473f15b"
    },
  ]
  const passFields = '-crawled_at -breadcrumbs -description -sku'
  const recProducts = await Products.find({$or: findParams},passFields);
  console.log(recProducts)
  res.json(recProducts)
})

module.exports = router;