const Types = require("mongoose").Types;
const Appointment = require("../../models/appointment");
const moment = require("moment");

const getAppointmentsForClientId = async (req, res) => {
  try {
    const { clientId } = req.params;

    const appointments = await Appointment.find({
      client: Types.ObjectId(clientId),
      appointmentCancel: false,
    })
      .populate("client")
      .populate("consultant")
      .sort({ createdAt: -1 });

    const parsedAppointments = appointments.map((appointment) => {
      const newDate = moment(appointment.date).format("YYYY-MM-DD");
      const startTime = moment(appointment.appointmentStartTime).format(
        "HH:mm"
      );
      const endTime = moment(appointment.appointmentEndTime).format("HH:mm");

      const newStartTime = moment(newDate + " " + startTime).format(
        "YYYY-MM-DD HH:mm"
      );
      const newEndTime = moment(newDate + " " + endTime).format(
        "YYYY-MM-DD HH:mm"
      );
      let color = "#778899";
      if (!appointment.appointmentBooked) {
        color = "#5FAD5F";
      } else {
        if (!appointment.appointmentCancel) {
          color = "#4682B4";
        } else {
          color = "#FA8072";
        }
      }
      if (appointment.videoEndTime) {
        color = "#778899";
      }

      const titleStartTime = moment(newDate + " " + startTime).format("HH:mm");
      const titleEndTime = moment(newDate + " " + endTime).format("HH:mm");

      return {
        consultant:
          appointment.consultant.firstName +
          " " +
          appointment.consultant.lastName,
        client: appointment.client
          ? appointment.client.firstName + " " + appointment.client.lastName
          : "",
        appointmentId: appointment._id,
        description: appointment.description,
        date: appointment.date,
        start: newStartTime,
        end: newEndTime,
        allDay: false,
        color: color,
        resource: appointment.client,
        appointmentBooked: appointment.appointmentBooked,
        consultantEmail: appointment.consultant.email,
        clientEmail: appointment.client.email,
        title: `${titleStartTime} - ${titleEndTime}`,
        appointmentCancel: appointment.appointmentCancel,
        videoStartTime: appointment.videoStartTime || null,
        videoEndTime: appointment.videoEndTime || null,
        peerId: appointment.consultant._id,
        consultantPrice: appointment.consultant.options.price,
        chatCount: appointment.conversation.length,
      };
    });

    return res.status(200).send(parsedAppointments);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = getAppointmentsForClientId;
