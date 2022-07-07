const Appointment = require('../../models/appointment');

const postAppointment = async (req, res) => {
  try {
    console.log(req.body)
    const appointment = new Appointment(req.body);
    await appointment.save();
    return res.status(200).send(appointment);
  } catch (error) {
    console.log(error);
  }
};

module.exports = postAppointment;
