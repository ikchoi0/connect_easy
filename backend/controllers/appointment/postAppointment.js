const Appointment = require('../../models/appointment');

const postAppointment = async (req, res) => {
  try {


    const appointments = await Appointment.insertMany(req.body);

    return res.status(200).send(appointments);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = postAppointment;
