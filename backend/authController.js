const { Users } = require("./models");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET = process.env.SECRET;

const generateAccessToken = (id) => {
  const payload = {
    id,
  };
  return jwt.sign(payload, SECRET, { expiresIn: "24h" });
};

class authController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Registration error:", errors });
      }
      const { name, surname, email, password, role } = req.body;
      const candidate = await Users.findOne({ email });
      if (candidate) {
        return res.status(400).json({
          success:false,
          message: "User with this email is already registered",
          candidate,
        });
      }
      const hashPassword = bcrypt.hashSync(password, 7);
      let user = new Users({
        name,
        surname,
        email,
        password: hashPassword,
        role,
        cart: [],
      });
      await user.save();
      const token = generateAccessToken(user._id);
      return res.json({
        success: true,
        message: "User successful registered!",
        token,
        user: { name, surname, email, role, cart: [], buyHistory: [] },
      }); // нужно добавить отправку token
    } catch (e) {
      res
        .status(400)
        .json({ success: false, message: "Registration error", e });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      let user = await Users.findOne({ email });
      const token = generateAccessToken(user._id);
      if (!user) {
        return res.json({
          success: false,
          message: `User with e-mail ${email} is not found`,
        });
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.json({ success: false, message: "Password is not valid" });
      }
      const { _id, name, surname, role } = user;
      let cart = user.cart || [];
      let buyHistory = user.buyHistory || []
      return res.json({
        success: true,
        token,
        user: { _id, name, surname, email, role, cart,buyHistory },
      });
    } catch (e) {
      res.json({ success: false, message: "Login error", e });
    }
  }
}

module.exports = new authController();
