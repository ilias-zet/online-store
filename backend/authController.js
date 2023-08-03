const { Images, Users, Roles } = require("./models");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const {secret} = require("./config")

const generateAccessToken = (id, roles) => {
  const payload = {
    id,
    roles,
  }
  return jwt.sign(payload,secret,{expiresIn:"24h"})
}

class authController {
  async registration(req, res) {
    try {
      const errors = validationResult(req)
      if(!errors.isEmpty()) {
        return res.status(400).json({message:"Registration error:",errors})
      }
      const { userName,userSurname,userEmail,userPassword } = req.body;
      const candidate = await Users.findOne({ userEmail });
      if (candidate) {
        return res
          .status(400)
          .json({ message: "User with this email is already registered",candidate});
      }
      const hashPassword = bcrypt.hashSync(userPassword, 7);
      const userRole = await Roles.findOne({ value: "USER" });
      const user = new Users({ userName, userSurname,userEmail, userPassword:hashPassword,roles:[userRole.value] });
      await user.save()
      return res.json({ message: "User successful registered!",user })
    } catch (e) {
      res.status(400).json({ message: "Registration error" });
    }
  }

  async login(req, res) {
    try {
      const { userEmail, userPassword } = req.body;
      const user = await Users.findOne({ userEmail });
      if(!user) {
        return res.status(400).json({messageUserNotFound:`User with e-mail ${userEmail} is not found`})
      }
      const validPassword = bcrypt.compareSync(userPassword, user.userPassword)
      if(!validPassword) {
        return res.status(400).json({messageValidPassword:"Password is not valid"})
      }
      const token = generateAccessToken(user._id, user.roles)
      return res.json({user})
    } catch (e) {
      res.status(400).json({ message: "Login error",e });
    }
  }

  async getUsers(req, res) {
    try {
      const users = new Users.find()
      res.json(users);
    } catch (e) {}
  }
}

module.exports = new authController();
