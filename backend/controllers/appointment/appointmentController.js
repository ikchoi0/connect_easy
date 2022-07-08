const postAppointment = require('./postAppointment');
const updateAppointment = require('./updateAppointment');
const getOpenedAppointments = require('./getOpenedAppointments');

exports.controllers = {
  postAppointment,
  updateAppointment,
  getOpenedAppointments,
};
