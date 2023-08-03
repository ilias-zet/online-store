const Router = require('express')
const router = new Router()
const controller = require('../authController')
const {check} = require("express-validator")
const authMiddleware = require('../Middleware/authMiddleware')

router.post("/registration",[
  check("userName","Username can't be empty").notEmpty(),
  check("userPassword","Password can't be shorter than 6 or longer than 20 symbols").isLength({min:6,max:20})
], controller.registration)
router.post("/login",controller.login)
router.get("/users",authMiddleware,controller.getUsers)

module.exports = router;