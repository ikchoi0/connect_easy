const Types = require('mongoose').Types;
const Appointment = require('../../models/appointment');
const moment = require('moment');

const getOpenedAppointments = async (req, res) => {
  try {
    const { consultantId } = req.params;

    const appointments = await Appointment.find({
      consultant: Types.ObjectId(consultantId),
    });

    /**
     * Event {
        title: string,
        start: Date,
        end: Date,
        allDay?: boolean
        resource?: any,
      }
     */

    const parsedAppointments = appointments.map((appointment) => {
      return {
        title: appointment.description,
        start: moment(appointment.appointmentStartTime).toDate(),
        end: moment(appointment.appointmentEndTime).toDate(),
        allDay: false,
        resource: appointment.client,
      };
    });

    return res.status(200).send(parsedAppointments);
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = getOpenedAppointments;
