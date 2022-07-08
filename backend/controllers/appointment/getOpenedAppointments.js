const Appointment = require('../../models/appointment');
const Types = require('mongoose').Types;

const getOpenedAppointments = async (req, res) => {
  try {
    const consultantId = req.params;

    const appointments = await Appointment.find({
      consultant: Types.ObjectId(consultantId),
    });

    return res.status(200).send(appointments);
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = getOpenedAppointments;
