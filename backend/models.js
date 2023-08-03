const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  _id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  gtin13: {
    type: Number,
    required: true,
  },
  availability: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  sku: String,
  priceCurrency: String,
  breadcrumbs: [String, String, String],
  images: String,
  crawled_at: String,
});
const imgSchema = new Schema({
  main_category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const Role = new Schema({
  value: { type: String, unique: true, default: "USER" },
});

const User = new Schema({
  userName: { type: String, unique: true, required: true },
  userSurname: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  userPassword: { type: String, required: true },
  roles: [{ type: String, ref: "Role" }],
});

const Products = mongoose.model("Product", productSchema, "products");
const Images = mongoose.model("Image", imgSchema, "images");

const Users = mongoose.model("User", User, "users");
const Roles = mongoose.model("Role", Role, "roles");

module.exports = { Products, Users, Images, Roles };
