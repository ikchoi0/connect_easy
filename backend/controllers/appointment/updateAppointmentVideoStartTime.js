const Appointment = require("../../models/appointment");
const Types = require("mongoose").Types;
const updateAppointmentVideoStartTime = async (req, res) => {
  try {
    // console.log(appointmentId);
    const { appointmentId } = req.body;
    console.log(appointmentId);
    const appointment = await Appointment.findById(
      Types.ObjectId(appointmentId)
    );
    if (!appointment) {
      return res.status(404).send("Appointment not found");
    }
    if (!appointment.hasOwnProperty("videoStartTime")) {
      await appointment.updateOne({
        videoStartTime: new Date(),
      });
    }

    console.log("Video call started", appointment);
    return res.status(200).send({
      data: appointment,
      message: "Video call start time updated",
      error: false,
    });
  } catch (error) {
    return res.status(500).send(error.message); // 500 Internal Server Error
  }
};

module.exports = updateAppointmentVideoStartTime;
