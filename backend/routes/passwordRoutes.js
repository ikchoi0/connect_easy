const express = require("express");
const router = express.Router();
const passwordController = require("../controllers/password/passwordController");
const Joi = require("joi");
const validator = require("express-joi-validation").createValidator({});
Joi.objectId = require("joi-objectid")(Joi);

const passwordSchema = Joi.object({
  token: Joi.string().required(),
  password: Joi.string().min(6).max(12).required(),
});

const emailSchema = Joi.object({
  email: Joi.string().email().required(),
});

router.get("/:email/:token", passwordController.controllers.getResetPassword);

router.post(
  "/",
  validator.body(emailSchema),
  passwordController.controllers.postResetPassword
);

router.post(
  "/reset",
  validator.body(passwordSchema),
  passwordController.controllers.postUpdatePassword
);

module.exports = router;
