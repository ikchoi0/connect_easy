const Appointment = require("../../models/appointment");
const User = require("../../models/user");
const Types = require("mongoose").Types;

const postStartMeeting = async (req, res) => {
  try {
    const { appointmentId, userId } = req.body;
    const appointment = await Appointment.findById(
      Types.ObjectId(appointmentId)
    );
    const user = await User.findById(Types.ObjectId(userId));
    if (!appointment) {
      return res.status(404).send("Appointment not found");
    }
    if (!user) {
      return res.status(404).send("User not found");
    }
    if (
      !appointment.hasOwnProperty("videoStartTime") &&
      !appointment.videoStartTime
    ) {
      appointment.videoStartTime = new Date();
      await appointment.save();
    }
    user.options = {
      ...user.options,
      hasActiveMeeting: true,
      activeMeetingId: appointmentId,
    };
    await user.save();

    return res.status(200).send({
      data: { appointment, user },
      message: "Video call start time updated",
      error: false,
    });
  } catch (error) {
    return res.status(500).send(error.message); // 500 Internal Server Error
  }
};

module.exports = postStartMeeting;
