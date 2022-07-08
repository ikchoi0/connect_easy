const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const appointmentController = require('../controllers/appointment/appointmentController');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const validator = require('express-joi-validation').createValidator({});
// const auth = require("../middleware/auth");

const appointmentSchema = Joi.object({
  // consultant: Joi.objectId().required(),
  // client: Joi.objectId().required(),
  date: Joi.date().required(),
  appointmentStartTime: Joi.date().required(),
  appointmentEndTime: Joi.date().required(),
  appointmentCancellation_time: Joi.date(),
  // appointmentCancel: Joi.boolean().required(),
  description: Joi.string(),
});

const appointmentSchemas = Joi.array().items(appointmentSchema);

router.post(
  '/',
  auth,
  // validator.body(appointmentSchemas),
  appointmentController.controllers.postAppointment
);

router.get('/', auth, appointmentController.controllers.getOpenedAppointments);

module.exports = router;
