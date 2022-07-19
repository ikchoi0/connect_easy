const Types = require("mongoose").Types;
const Appointment = require("../../models/appointment");
const moment = require("moment");

const getAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    const appointment = await Appointment.findById(
      Types.ObjectId(appointmentId)
    )
      .populate("client")
      .populate("consultant");

    if (!appointment) return res.status(404).send("Appointment not found");

    // Set videoStartTime if property is not set yet:

    const parsedAppointment = {
      client: appointment.client,
      consultant: appointment.consultant,
      appointmentId: appointment._id,
      description: appointment.description,
      date: appointment.date,
      start: moment(appointment.appointmentStartTime).toDate(),
      end: moment(appointment.appointmentEndTime).toDate(),
      allDay: false,
      resource: appointment.client,
      videoStartTime: moment(appointment.videoStartTime).toDate() || "",
      videoEndTime: moment(appointment.videoEndTime).toDate() || "",
    };

    return res.status(200).send(parsedAppointment);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = getAppointment;
