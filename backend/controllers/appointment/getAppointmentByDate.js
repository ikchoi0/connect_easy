const Appointment = require('../../models/appointment');
const Types = require('mongoose').Types;
const moment = require('moment');

/**
 * @description - gets all the available spots for the day
 */

const getAppointmentByDate = async (req, res) => {
  try {
    const { consultantId, date } = req.params;

    const parsedDate = moment(date).toDate();
    const parsedDatePlusOne = moment(date).add(1, 'days').toDate();

    const appointments = await Appointment.find({
      date: {
        $gte: parsedDate,
        $lt: parsedDatePlusOne,
      },
      consultant: Types.ObjectId(consultantId),
      appointmentBooked: false,
    });

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
        appointmentId: appointment._id,
        description: appointment.description,
        date: appointment.date,
        start: newStartTime,
        end: newEndTime,
        allDay: false,
        resource: appointment.client,
      };
    });

    return res.status(200).send(parsedAppointments);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = getAppointmentByDate;
