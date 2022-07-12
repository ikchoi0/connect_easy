export const filterAppointments = (appointments, selectedStatusFilter) => {
  let filteredAppointmentsList;
  switch (selectedStatusFilter) {
    case "Upcoming":
      filteredAppointmentsList = appointments.filter((appointment) => {
        if (
          appointment.appointmentBooked &&
          !appointment.hasOwnProperty("videoEndTime")
        ) {
          return appointment;
        }
      });
      break;
    case "Unbooked":
      filteredAppointmentsList = appointments.filter((appointment) => {
        if (
          !appointment.appointmentBooked &&
          !appointment.hasOwnProperty("videoEndTime")
        ) {
          return appointment;
        }
      });
      break;
    case "Canceled":
      filteredAppointmentsList = appointments.filter((appointment) => {
        if (appointment.appointmentCancel) {
          return appointment;
        }
      });
      break;
    case "Past":
      filteredAppointmentsList = appointments.filter((appointment) => {
        if (appointment.hasOwnProperty("videoEndTime")) {
          return appointment;
        }
      });
      break;
    default:
      filteredAppointmentsList = appointments;
  }
  return filteredAppointmentsList;
};
