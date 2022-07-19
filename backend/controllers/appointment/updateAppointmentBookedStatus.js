const Appointment = require('../../models/appointment');
const Types = require('mongoose').Types;
const updateAppointmentBookedStatus = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    const appointment = await Appointment.findById(
      Types.ObjectId(appointmentId)
    );

    if (!appointment) {
      return res.status(404).send('Appointment not found');
    }

    //create a copy of the appointment
    const appointmentCopy = { ...appointment._doc };

    // attach the copy appointment to the consultant
    appointmentCopy.appointmentBooked = false;
    appointmentCopy.client = null;
    appointmentCopy.description = null;
    delete appointmentCopy._id;

    const newCopy = await Appointment.create(appointmentCopy);

    await appointment.updateOne({
      appointmentCancel: true,
      appointmentCancellation_time: new Date(),
    });

    return res.status(200).send(appointment);
  } catch (error) {
    return res.status(500).send(error.message); // 500 Internal Server Error
  }
};

module.exports = updateAppointmentBookedStatus;
