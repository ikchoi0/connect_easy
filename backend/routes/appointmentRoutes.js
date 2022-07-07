const express = require('express');
const router = express.Router();

const appointmentController = require('../controllers/appointment/appointmentController');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const validator = require('express-joi-validation').createValidator({});
// const auth = require("../middleware/auth");

const appointmentSchema = Joi.object({
  consultant: Joi.objectId().required(),
  // client: Joi.objectId().required(),
  appointmentBooked: Joi.boolean().required(),
  appointmentStartTime: Joi.date().required(),
  appointmentEndTime: Joi.date().required(),
  appointmentCancellation_time: Joi.date(),
  appointmentCancel: Joi.boolean().required(),
});

router.post(
  '/',
  validator.body(appointmentSchema),
  appointmentController.controllers.postAppointment
);
