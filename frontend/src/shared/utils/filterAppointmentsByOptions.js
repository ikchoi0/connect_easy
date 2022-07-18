import { calculateTotalPrice } from "./calculator";
export const filterAppointmentsByOptions = (
  appointments,
  filterOptions,
  role,
  name,
  minPrice,
  maxPrice
) => {
  let filteredAppointmentsList = appointments;
  if (filterOptions) {
    for (let option of filterOptions) {
      switch (option) {
        case "name":
          if (name === "Show All") {
            filteredAppointmentsList = appointments;
          } else {
            filteredAppointmentsList = filteredAppointmentsList.filter(
              (appointment) => {
                if (role === "consultant") {
                  return appointment.client === name;
                } else {
                  return appointment.consultant === name;
                }
              }
            );
          }
          break;
        case "minPrice":
          filteredAppointmentsList = filteredAppointmentsList.filter(
            (appointment) => {
              return calculateTotalPrice(appointment) >= minPrice;
            }
          );
          break;
        case "maxPrice":
          filteredAppointmentsList = filteredAppointmentsList.filter(
            (appointment) => {
              return calculateTotalPrice(appointment) <= maxPrice;
            }
          );
          break;
        default:
          return filteredAppointmentsList;
      }
    }
  }

  return filteredAppointmentsList;
};
