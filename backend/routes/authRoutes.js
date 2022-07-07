const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth/authController');
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});
// const auth = require("../middleware/auth");

const registerSchema = Joi.object({
  firstName: Joi.string().min(3).max(12).required(),
  lastName: Joi.string().min(1).max(12).required(),
  password: Joi.string().min(6).max(12).required(),
  email: Joi.string().email().required(),
  consultantCheck: Joi.boolean().required(),
});

const loginSchema = Joi.object({
  password: Joi.string().min(6).max(12).required(),
  email: Joi.string().email().required(),
});

router.post(
  '/register',
  validator.body(registerSchema),
  authController.controllers.postRegister
);
router.post(
  '/login',
  validator.body(loginSchema),
  authController.controllers.postLogin
);

// test route to verify if our middleware is working
// router.get("/test", auth, (req, res) => {
//   res.send("request passed");
// });

module.exports = router;
