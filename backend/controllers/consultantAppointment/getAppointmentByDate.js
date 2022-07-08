const Appointment = require('../../models/appointment');
const moment = require('moment');

const getAppointmentByDate = async (req, res) => {
  try {
    const { date } = req.params;

    const appointments = await Appointment.find({
      $where: `this.appointmentStartTime.getDate() == ${date}`,
    });

    if (!appointments.length)
      return res.status(404).send('Appointments not found');
    /**
     * Event {
        title: string,
        start: Date,
        end: Date,
        allDay?: boolean
        resource?: any,
      }
     */

    const parsedAppointments = {
      title: appointments.description,
      start: moment(appointments.appointmentStartTime).toDate(),
      end: moment(appointments.appointmentEndTime).toDate(),
      allDay: false,
      resource: appointments.client,
    };

    return res.status(200).send(parsedAppointments);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = getAppointmentByDate;
