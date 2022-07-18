import { calculateTotalPrice } from "./calculator";
import moment from "moment";

function swap(a, b) {
  return [b, a];
}
export const sortHelper = (array, sortName, role, order) => {
  switch (sortName) {
    case "email":
      return array.sort((a, b) => {
        const [arr1, arr2] = order ? swap(a, b) : [a, b];
        if (role === "consultant") {
          return arr1.clientEmail.localeCompare(arr2.clientEmail);
        } else {
          return arr1.consultantEmail.localeCompare(arr2.consultantEmail);
        }
      });
    case "peerName":
      return array.sort((a, b) => {
        const [arr1, arr2] = order ? swap(a, b) : [a, b];
        if (role === "consultant") {
          return arr1.client.localeCompare(arr2.client);
        } else {
          return arr1.consultant.localeCompare(arr2.consultant);
        }
      });
    case "description":
      return array.sort((a, b) => {
        const [arr1, arr2] = order ? swap(a, b) : [a, b];
        return arr1.description.localeCompare(arr2.description);
      });

    case "hourlyRate":
      return array.sort((a, b) => {
        const [arr1, arr2] = order ? swap(a, b) : [a, b];

        return arr1.hourlyRate - arr2.hourlyRate;
      });
    case "totalPrice":
      return array.sort((a, b) => {
        const [arr1, arr2] = order ? swap(a, b) : [a, b];
        return calculateTotalPrice(arr1) - calculateTotalPrice(arr2);
      });
    default:
      return array.sort((a, b) => {
        const [arr1, arr2] = order ? swap(a, b) : [a, b];
        return moment(arr1.start).isAfter(moment(arr2.start)) ? 1 : -1;
      });
  }
};
