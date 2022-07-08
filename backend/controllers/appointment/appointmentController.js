const postAppointment = require('./postAppointment');
const updateAppointment = require('./updateAppointment');
const getOpenedAppointments = require('./getOpenedAppointments');
const deleteAppointment = require('./deleteAppointment');
const getAppointment = require('./getAppointment');
const getAppointmentByDate = require('./getAppointmentByDate');

exports.controllers = {
  postAppointment,
  updateAppointment,
  getOpenedAppointments,
  deleteAppointment,
  getAppointment,
  getAppointmentByDate,
};
