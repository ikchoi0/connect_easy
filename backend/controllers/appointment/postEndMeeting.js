const Appointment = require("../../models/appointment");
const User = require("../../models/user");
const Types = require("mongoose").Types;
const postEndMeeting = async (req, res) => {
  try {
    if (req.body && req.body.appointmentId) {
      const { appointmentId } = req.body;
      const appointment = await Appointment.findById(
        Types.ObjectId(appointmentId)
      )
        .populate("client")
        .populate("consultant");

      if (!appointment) {
        return res.status(404).send("Appointment not found");
      }
      if (!appointment.hasOwnProperty("videoEndTime")) {
        await appointment.updateOne({
          videoEndTime: new Date(),
        });
      }
      await appointment.client.updateOne({
        options: {
          hasActiveMeeting: false,
          activeMeetingId: "",
        },
      });
      await appointment.consultant.updateOne({
        options: {
          hasActiveMeeting: false,
          activeMeetingId: "",
        },
      });
      return res.status(200).send({
        data: { appointment },
        message: "Meeting ended",
        error: false,
      });
    } else {
      return res.status(400).send("AppointmentId is required");
    }
  } catch (error) {
    return res.status(500).send(error.message); // 500 Internal Server Error
  }
};

module.exports = postEndMeeting;
