const Appointment = require('../../models/appointment');
const Types = require('mongoose').Types;

const updateAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    const {
      consultant,
      description,
      appointmentBooked,
      appointmentStartTime,
      appointmentEndTime,
    } = req.body;

    const appointment = await Appointment.findById(
      Types.ObjectId(appointmentId)
    );
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
