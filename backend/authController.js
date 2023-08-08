const { Users } = require("./models");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET = process.env.SECRET;

const generateAccessToken = (id) => {
  const payload = {
    id,
  }
  return jwt.sign(payload,SECRET,{expiresIn:"24h"})
}

class authController {
  async registration(req, res) {
    try {
      const errors = validationResult(req)
      if(!errors.isEmpty()) {
        return res.status(400).json({message:"Registration error:",errors})
      }
      const { name,surname,email,password } = req.body;
      const candidate = await Users.findOne({ email });
      if (candidate) {
        return res
          .status(400)
          .json({ message: "User with this email is already registered",candidate});
      }
      const hashPassword = bcrypt.hashSync(password, 7);
      const user = new Users({ name, surname,email, password:hashPassword });
      await user.save()
      return res.json({ message: "User successful registered!",user })
    } catch (e) {
      res.status(400).json({ message: "Registration error" ,e});
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const body = req.body
      const user = await Users.findOne({ email });
      if(!user) {
        return res.status(400).json({message:`User with e-mail ${email} is not found`})
      }
      const validPassword = bcrypt.compareSync(password, user.password)
      if(!validPassword) {
        return res.status(400).json({message:"Password is not valid"})
      }
      const token = generateAccessToken(user._id)
      return res.json({token,user})
    } catch (e) {
      res.status(400).json({ message: "Login error",e });
    }
  }
}

module.exports = new authController();
