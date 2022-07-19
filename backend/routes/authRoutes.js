const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth/authController");
const Joi = require("joi");
const validator = require("express-joi-validation").createValidator({});
Joi.objectId = require("joi-objectid")(Joi);
const auth = require("../middleware/auth");

const registerSchema = Joi.object({
  firstName: Joi.string().min(3).max(12).required(),
  lastName: Joi.string().min(1).max(12).required(),
  password: Joi.string().min(6).max(12).required(),
  email: Joi.string().email().required(),
  consultantCheck: Joi.boolean().required(),
  consultantCategoryId: Joi.optional(),
});

const loginSchema = Joi.object({
  password: Joi.string().min(6).max(12).required(),
  email: Joi.string().email().required(),
});
router.get(
  "/getMe",
  auth(["consultant", "client"]),
  authController.controllers.getUserMeetingStatus
);

router.post(
  "/register",
  validator.body(registerSchema),
  authController.controllers.postRegister
);

router.post(
  "/login",
  validator.body(loginSchema),
  authController.controllers.postLogin
);

module.exports = router;
