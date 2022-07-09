const Types = require("mongoose").Types;
const Appointment = require("../../models/appointment");
const moment = require("moment");

const getAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    const appointment = await Appointment.findById(
      Types.ObjectId(appointmentId)
    );

    if (!appointment) return res.status(404).send("Appointment not found");
    /**
     * Event {
        description: string,
        start: Date,
        end: Date,
        allDay?: boolean
        resource?: any,
      }
     */

    const parsedAppointment = {
      appointmentId: appointment._id,
      description: appointment.description,
      date: appointment.date,
      start: moment(appointment.appointmentStartTime).toDate(),
      end: moment(appointment.appointmentEndTime).toDate(),
      allDay: false,
      resource: appointment.client,
    };

    return res.status(200).send(parsedAppointment);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = getAppointment;
