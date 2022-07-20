const Appointment = require('../../models/appointment');
const Types = require('mongoose').Types;
const updateAppointment = async (req, res) => {
  try {
    const { description, selectedAppointmentId } = req.body;

    const appointment = await Appointment.findById(
      Types.ObjectId(selectedAppointmentId)
    );

    if (!appointment) {
      return res.status(404).send('Appointment not found');
    }

    await appointment.updateOne({
      client: req.user._id,
      description,
      _id: Types.ObjectId(selectedAppointmentId),
      appointmentBooked: true,
    });

    return res.status(200).send(appointment);
  } catch (error) {
    console.log(error);
  }
};

module.exports = updateAppointment;
