const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: { type: String, required: true },
  brand: { type: String, required: true },
  description: { type: String, required: true },
  gtin13: { type: Number, required: true },
  availability: { type: String, required: true },
  price: { type: Number, required: true },
  url: { type: String, required: true },
  sku: String,
  priceCurrency: String,
  breadcrumbs: [String],
  images: String,
  crawled_at: String,
  main_category:String,
});
const imgSchema = new Schema({
  main_category: { type: String, required: true },
  image: { type: String, required: true },
});

const User = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const Products = mongoose.model("Product", productSchema, "products");
const Images = mongoose.model("Image", imgSchema, "images");

const Users = mongoose.model("User", User, "users");

module.exports = { Products, Users, Images };
