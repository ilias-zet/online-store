const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models')
const User = require('./models')
const productsRoutes = require('./routes/products')
require('dotenv').config()

const app = express();

const PORT = process.env.PORT || 3001;
const MONGO_URL = process.env.MONGO_URL
if(!MONGO_URL) {
  throw new Error(".env Error: Some variable is not defined or does not exist")
}

async function start() {
    try{
        await mongoose.connect(MONGO_URL, {
            useNewUrlParser:true,
            useUnifiedTopology: true,
        })
        console.log("Server has been conected to Mongo DB")
        
        app.listen(PORT, () => {
            console.log('Server has been started on port:', PORT)
        })
    } catch(e) {
        console.log("Server error: ", e)
        process.exit(1)
    }
}

start()

// Conditional save user to DB
app.get('/SignUpNewUser',async (request, response) => {
  const { userData } = request.query
  const { name,surName,email,pass } = userData;
  let user = await User.findOne({ email })
  let succes;
  if(!user) {
    let newUser = new User({ name,surName,email,pass })
    try {
      await newUser.save();
      succes = true;
    } catch(e) {
      console.log("User save error: ", e)
    }
  }
  await response.json({ succes,user })
})

// Get all categories in DB
app.get('/getAllCategories',async (request, response) => {
  const categories = await Product.distinct("main_category")
  await response.json(categories)
})

app.use(productsRoutes)