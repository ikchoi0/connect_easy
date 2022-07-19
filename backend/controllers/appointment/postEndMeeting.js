const Appointment = require("../../models/appointment");
const User = require("../../models/user");
const Types = require("mongoose").Types;

const postEndMeeting = async (req, res) => {
  try {
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
    if (appointment.videoStartTime) {
      appointment.client.options = {
        ...appointment.client.options,
        hasActiveMeeting: false,
        activeMeetingId: "",
      };
      await appointment.client.save();
      appointment.consultant.options = {
        ...appointment.consultant.options,
        hasActiveMeeting: false,
        activeMeetingId: "",
      };
      await appointment.consultant.save();

      return res.status(200).send({
        data: { appointment },
        message: "Meeting ended and appointment was updated successfully",
        error: false,
      });
    } else {
      return res.status(400).send({
        data: {},
        message: "You can't end a meeting that hasn't started yet",
        error: true,
      });
    }
  } catch (error) {
    return res.status(500).send(error.message); // 500 Internal Server Error
  }
};

module.exports = postEndMeeting;
