const Appointment = require('../../models/appointment');

const updateAppointment = async (req, res) => {
  try {
    const {
      conultant,
      client,
      description,
      appointmentBooked,
      appointmentStartTime,
      appointmentEndTime,
      appointmentCancellation_time,
      appointmentCancel,
    } = req.body;

    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).send('Appointment not found');
    }
    await appointment.updateOne(req.body);
    return res.status(200).send(appointment);
  } catch (error) {
    console.log(error);
  }
};

module.exports = updateAppointment;
