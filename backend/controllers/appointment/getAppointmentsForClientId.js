const Types = require('mongoose').Types;
const Appointment = require('../../models/appointment');
const moment = require('moment');

const getAppointmentsForClientId = async (req, res) => {
  try {
    const { clientId } = req.params;

    const appointments = await Appointment.find({
      client: Types.ObjectId(clientId),
      appointmentCancel: false,
    })
      .populate('client')
      .populate('consultant')
      .sort({ createdAt: -1 });

    /**
     * Event {
        description: string,
        start: Date,
        end: Date,
        allDay?: boolean
        resource?: any,
      }
     */

    const parsedAppointments = appointments.map((appointment) => {
      const newDate = moment(appointment.date).format('YYYY-MM-DD');
      const startTime = moment(appointment.appointmentStartTime).format(
        'HH:mm'
      );
      const endTime = moment(appointment.appointmentEndTime).format('HH:mm');

      const newStartTime = moment(newDate + ' ' + startTime).format(
        'YYYY-MM-DD HH:mm'
      );
      const newEndTime = moment(newDate + ' ' + endTime).format(
        'YYYY-MM-DD HH:mm'
      );
      return {
        consultant:
          appointment.consultant.firstName +
          ' ' +
          appointment.consultant.lastName,
        client: appointment.client
          ? appointment.client.firstName + ' ' + appointment.client.lastName
          : '',
        appointmentId: appointment._id,
        description: appointment.description,
        date: appointment.date,
        start: newStartTime,
        end: newEndTime,
        allDay: false,
        resource: appointment.client,
        appointmentBooked: appointment.appointmentBooked,
        consultantEmail: appointment.consultant.email,
        clientEmail: appointment.client?.email || '',
        appointmentCancel: appointment.appointmentCancel,
      };
    });

    return res.status(200).send(parsedAppointments);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = getAppointmentsForClientId;
