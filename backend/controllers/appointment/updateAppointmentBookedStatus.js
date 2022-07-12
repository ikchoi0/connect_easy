const Appointment = require("../../models/appointment");
const Types = require("mongoose").Types;
const updateAppointmentBookedStatus = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    const appointment = await Appointment.findById(
      Types.ObjectId(appointmentId)
    );

    if (!appointment) {
      return res.status(404).send("Appointment not found");
    }

    await appointment.updateOne({
      client: null,
      appointmentBooked: false,
    });
    console.log("BOOKED CANCELLED", appointment);
    return res.status(200).send(appointment);
  } catch (error) {
    return res.status(500).send(error.message); // 500 Internal Server Error
  }
};

module.exports = updateAppointmentBookedStatus;
