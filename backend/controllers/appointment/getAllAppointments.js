const Types = require("mongoose").Types;
const Appointment = require("../../models/appointment");
const moment = require("moment");
const getAllAppointments = async (req, res) => {
  try {
    const { consultantId } = req.params;

    let appointments = [];
    if (req.user.role === "consultant") {
      appointments = await Appointment.find({
        consultant: Types.ObjectId(consultantId),
      })
        .populate("client")
        .populate("consultant")
        .sort({ createdAt: -1 });
      // if user is client or non-registered user
    } else if (req.user.role === "client") {
      appointments = await Appointment.find({
        consultant: Types.ObjectId(consultantId),
        appointmentBooked: false,
      })
        .populate("client")
        .populate("consultant")
        .sort({ createdAt: -1 });
    }

    const parsedAppointments = appointments.map((appointment) => {
      const newDate = moment(appointment.date).format("YYYY-MM-DD");
      const startTime = moment(appointment.appointmentStartTime).format(
        "HH:mm"
      );
      const endTime = moment(appointment.appointmentEndTime).format("HH:mm");

      const newStartTime = moment(newDate + " " + startTime);
      const newEndTime = moment(newDate + " " + endTime);

      const titleStartTime = moment(newDate + " " + startTime).format("h:mm a");
      const titleEndTime = moment(newDate + " " + endTime).format("h:mm a");

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
        title: `${titleStartTime} - ${titleEndTime}`,
        allDay: false,
        color: color,
        resource: appointment.client,
        appointmentBooked: appointment.appointmentBooked,
        consultantEmail: appointment.consultant.email,
        appointmentCancel: appointment.appointmentCancel,
        clientEmail: appointment.client?.email || "",
        videoStartTime: appointment.videoStartTime || null,
        videoEndTime: appointment.videoEndTime || null,
        peerId: appointment.client?._id,
        consultantPrice: appointment.consultant.options.price,
        chatCount: appointment.conversation.length,
      };
    });

    return res.status(200).send(parsedAppointments);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = getAllAppointments;
