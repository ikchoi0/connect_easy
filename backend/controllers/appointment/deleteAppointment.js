const Appointment = require("../../models/appointment");
const Types = require("mongoose").Types;

const deleteAppointment = async (req, res) => {
  try {
    const { consultantId } = req.params;

    const appointment = await Appointment.findByIdAndDelete(
      Types.ObjectId(consultantId)
    );

    return res.status(200).send(appointment);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = deleteAppointment;
