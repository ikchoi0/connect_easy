const Appointment = require("../../models/appointment");
const Types = require("mongoose").Types;
const sendEmail = require("../../utils/mailHelper");
const DASHBOARD_PAGE = "http://localhost:3000/dashboard/";
const emailConfirmation = require("../../forms/bookConfirmation");
const updateAppointment = async (req, res) => {
  try {
    const { description, selectedAppointmentId } = req.body;

    const appointment = await Appointment.findById(
      Types.ObjectId(selectedAppointmentId)
    ).populate("consultant");

    if (!appointment) {
      return res.status(404).send("Appointment not found");
    }

    await appointment
      .updateOne({
        client: req.user._id,
        description,
        _id: Types.ObjectId(selectedAppointmentId),
        appointmentBooked: true,
      })
      .then(async () => {
        sendEmail(
          appointment.consultant.email,
          "New booking!",
          emailConfirmation(
            req.user.email,
            description,
            appointment,
            DASHBOARD_PAGE
          )
        );
      });

    return res.status(200).send(appointment);
  } catch (error) {
    console.log(error);
  }
};

module.exports = updateAppointment;
