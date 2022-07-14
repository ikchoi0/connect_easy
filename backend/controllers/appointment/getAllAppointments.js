const Types = require("mongoose").Types;
const Appointment = require("../../models/appointment");
const moment = require("moment");
const COLORS = ["grey"];
const getAllAppointments = async (req, res) => {
  try {
    const { consultantId } = req.params;

    let appointments = [];
    if (req.user.role === "consultant") {
      appointments = await Appointment.find({
        consultant: Types.ObjectId(consultantId),
      })
        .populate("client")
        .populate("consultant");
      // if user is client or non-registered user
    } else if (req.user.role === "client") {
      appointments = await Appointment.find({
        consultant: Types.ObjectId(consultantId),
        appointmentBooked: false,
      })
        .populate("client")
        .populate("consultant");
    }

    /**
     * Event {
        description: string,
        start: Date,
        end: Date,
        allDay?: boolean
        resource?: any,
      }
     */

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
      const titleStartTime = moment(newDate + " " + startTime).format("HH:mm");
      const titleEndTime = moment(newDate + " " + endTime).format("HH:mm");

      let color = "#778899";
      // color = appointment["videoEndTime"] && "#778899";
      if (!appointment.appointmentBooked) {
        color = "#90EE90";
      } else {
        if (!appointment.appointmentCancel) {
          color = "#4682B4";
        } else {
          color = "#FA8072";
        }
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
        // isMeetingLive: appointment.isMeetingLive,
      };
    });

    return res.status(200).send(parsedAppointments);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = getAllAppointments;
