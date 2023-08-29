const express = require("express");
const mongoose = require("mongoose");
const { Images } = require("./models");
const authRouter = require("./routes/auth");
const productsRoutes = require("./routes/products");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.static("public"));

app.use(express.json());
app.use("/auth", authRouter);

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
if (!MONGO_URL) {
  throw new Error(
    ".env Error: Variable 'MONGO_URL' is not defined or does not exist"
  );
}
if (!PORT) {
  throw new Error(
    ".env Error: Variable 'PORT'  is not defined or does not exist"
  );
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

app.get("/getCategories", async (req, res) => {
  const categories = await Images.find({});
  res.json(categories);
});

app.get("/getRecommendedCategories", async (req, res) => {
  const randomDoc = await Images.aggregate([{ $sample: { size: 6 } }]);
  console.log(randomDoc);
  res.json(randomDoc);
});

app.use(productsRoutes);
