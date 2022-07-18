import { calculateTotalPrice } from "./calculator";
export const filterAppointmentsByOptions = (
  appointments,
  filterOptions,
  role,
  name,
  minPrice,
  maxPrice
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
    case "minPrice":
      filteredAppointmentsList = appointments.filter((appointment) => {
        return calculateTotalPrice(appointment) >= minPrice;
      });
      break;
    case "maxPrice":
      filteredAppointmentsList = appointments.filter((appointment) => {
        return calculateTotalPrice(appointment) <= maxPrice;
      });
      break;
    default:
      return appointments;
  }
  return filteredAppointmentsList;
};
