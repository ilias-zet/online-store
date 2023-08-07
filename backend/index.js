const express = require("express");
const mongoose = require("mongoose");
const { Products, Users, Images } = require("./models");
const authRouter = require("./routes/auth")
const productsRoutes = require("./routes/products");
const cors = require('cors');
require("dotenv").config();

const app = express();
app.use(cors())
app.use(express.static('public'));

app.use(express.json())
app.use("/auth",authRouter)

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


app.get("/getImages", async(req,res) => {
  const images = await Images.find({});
  res.json(images)
})

app.use(productsRoutes);
