const Types = require('mongoose').Types;
const Appointment = require('../../models/appointment');
const moment = require('moment');

const getAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    const appointment = await Appointment.findById(
      Types.ObjectId(appointmentId)
    );

    if (!appointment) return res.status(404).send('Appointment not found');
    /**
     * Event {
        title: string,
        start: Date,
        end: Date,
        allDay?: boolean
        resource?: any,
      }
     */

    const parsedAppointment = {
      title: appointment.description,
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
