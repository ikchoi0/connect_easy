import moment from "moment";

export const calculateTotalPrice = (appointment) => {
  return (
    ((moment(appointment.end).unix() - moment(appointment.start).unix()) /
      3600) *
    appointment.consultantPrice
  );
};
