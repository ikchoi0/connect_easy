export const filterAppointmentsByOptions = (
  appointments,
  filterOptions,
  role,
  name
) => {
  let filteredAppointmentsList;
  switch (filterOptions) {
    case "name":
      filteredAppointmentsList = appointments.filter((appointment) => {
        if (role === "consultant") {
          return appointment.client === name;
        } else {
          return appointment.consultant === name;
        }
      });
      break;
    default:
      return appointments;
  }
  return filteredAppointmentsList;
};
