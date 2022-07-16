const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const appointmentController = require("../controllers/appointment/appointmentController");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const validator = require("express-joi-validation").createValidator({});
// const auth = require("../middleware/auth");

const appointmentSchema = Joi.object({
  // consultant: Joi.objectId().required(),
  // client: Joi.objectId().required(),
  date: Joi.date().required(),
  appointmentStartTime: Joi.date().required(),
  appointmentEndTime: Joi.date().required(),
  appointmentCancellation_time: Joi.date(),
  // appointmentCancel: Joi.boolean().required(),
  description: Joi.string().optional(),
});

const appointmentSchemas = Joi.array().items(appointmentSchema);

/**
 * enum: ['admin', 'client', 'consultant']
 * example: auth(['consultant'])
 */

router.post(
  "/",
  auth(["consultant"]),
  // validator.body(appointmentSchemas),
  appointmentController.controllers.postAppointment
);

router.get(
  "/:consultantId",
  auth(["consultant", "client"]),
  appointmentController.controllers.getAllAppointments
);

router.delete(
  "/:consultantId",
  auth(["consultant"]),
  appointmentController.controllers.deleteAppointment
);

// GET A Appointment
router.get(
  "/single/:appointmentId",
  auth(["consultant", "client"]),

  appointmentController.controllers.getAppointment
);

router.get(
  "/date/:consultantId/:date",
  auth(["consultant", "client"]),
  appointmentController.controllers.getAppointmentByDate
);

router.patch(
  "/book",
  auth(["client"]),
  appointmentController.controllers.updateAppointment
);

// Client Appointments
router.get(
  "/client/:clientId",
  auth(["client", "consultant"]),
  appointmentController.controllers.getAppointmentsForClientId
);

router.patch(
  "/cancel",
  auth(["client", "consultant"]),
  appointmentController.controllers.updateAppointmentBookedStatus
);

router.post(
  "/postStartMeeting",
  auth(["client", "consultant"]),
  appointmentController.controllers.postStartMeeting
);
module.exports = router;

router.post(
  "/postEndMeeting",
  auth(["client", "consultant"]),
  appointmentController.controllers.postEndMeeting
);
module.exports = router;
