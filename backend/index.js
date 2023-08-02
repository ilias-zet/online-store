const express = require("express");
const mongoose = require("mongoose");
const { Product, User } = require("./models");
const productsRoutes = require("./routes/products");
const cors = require('cors');
require("dotenv").config();

const app = express();
app.use(cors())

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
if (!MONGO_URL) {
  throw new Error(".env Error: Variable 'MONGO_URL' is not defined or does not exist");
}
if (!PORT) {
  throw new Error(".env Error: Variable 'PORT'  is not defined or does not exist");
}

async function start() {
  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Server has been conected to Mongo DB");

    app.listen(PORT, () => {
      console.log("Server has been started on port:", PORT);
    });
  } catch (e) {
    console.log("Server error: ", e);
    process.exit(1);
  }
}

start();

// Conditional save user to DB
app.post("/createUser", async (request, response) => {
  const { userData } = request.query;
  const { name, surname, email, pass } = userData;
  let success;
  let user = await User.findOne({ email })
  if(user){
    return response.status(500).send({message : 'User with this e-mail is already signed up!'})
  }
  else {
    try {
      success = true; 
      user = new User({ name, surname, email, pass });
      await user.save();
    } catch (e) {
      console.log("User save error: ", e);
      return response.status(500).send({message : 'Error saving user!'})
    }
  }
  response.json({ success, user });
});

// Get all categories in DB
app.get("/getAllCategories", async (request, response) => {
  const categories = await Product.distinct("main_category");
  response.json(categories);
});

app.use(productsRoutes);
