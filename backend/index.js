const express = require("express");
const mongoose = require("mongoose");
const { Images, Users } = require("./models");
const { Products } = require("./models");
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

app.get("/getRecommended", async (req, res) => {
  const randomCategories = await Images.aggregate([{ $sample: { size: 6 } }]);
  const findParams = [
    "64987992e4498b4d8473f158",
    "64987992e4498b4d8473f15f",
    "64987992e4498b4d8473f15b",
  ];
  const passFields = "-crawled_at -breadcrumbs -description -sku";
  const products = await Products.find(
    { _id: { $in: findParams } },
    passFields
  );
  const recomended = {
    randomCategories,
    products,
  };
  res.json(recomended);
});

app.get("/getBasket", async (req, res) => {
  const { user } = req.query;
  let findedUser;
  if (user) {
    findedUser = await Users.find({ email: user.email });
  } else {
    console.log("You unsigned");
  }
  res.json(findedUser);
});

app.use(productsRoutes);
