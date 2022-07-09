import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AppointmentCard from './AppointmentCard';
import { useDispatch, useSelector } from 'react-redux';
import {
  getOpenedAppointments,
  deleteOneAppointment,
} from '../store/reducers/scheduleReducer';
import moment from 'moment';

export default function Home() {
  // Grab the user details state from the store:
  const userDetails = useSelector((state) => state.auth.userDetails);

  // Grab the all appointments for the user above from the store:
  const consultantAppointments = useSelector((state) => state.scheduler);

  // Filter menu for appointment status types:
  const [filterStatus, setFilterStatus] = React.useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (userDetails) {
      dispatch(getOpenedAppointments(userDetails.userId));
    }
  }, [dispatch, userDetails]);

  // Delete an appointment:
  const handleDeleteAppointmentOnClick = (id) => {
    dispatch(deleteOneAppointment(id));
  };

  // Mapped appointments for the user:
  const mappedAppointments = consultantAppointments.appointments.map(
    (appointment, index) => {
      return (
        <AppointmentCard
          key={index}
          id={appointment.appointmentId}
          description={appointment.title}
          date={appointment.date}
          startTime={moment(appointment.start).format('HH:mm A')}
          endTime={moment(appointment.end).format('HH:mm A')}
          onDelete={handleDeleteAppointmentOnClick}
        />
      );
    }
  );

  const handleChange = (event) => {
    setFilterStatus(event.target.value);
  };

  return (
    <Box
      sx={{
        maxWidth: '100%',
        minHeight: '50vh',
        padding: '20px',
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '5px',
      }}
    >
      <Typography variant="h4" component="h1" mb={'30px'}>
        Welcome, {userDetails && userDetails.firstName}{' '}
        {userDetails && userDetails.lastName}!
      </Typography>

      <FormControl
        sx={{
          maxWidth: '20%',
        }}
      >
        <InputLabel id="demo-simple-select-label">Filter by Status</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={filterStatus}
          label="Appointment Status"
          onChange={handleChange}
        >
          <MenuItem value={'Unbooked'}>Unbooked</MenuItem>
          <MenuItem value={'Past'}>Past</MenuItem>
          <MenuItem value={'Canceled'}>Canceled</MenuItem>
          <MenuItem value={'Upcoming'}>Upcoming</MenuItem>
        </Select>
      </FormControl>

      <Box
        sx={{
          marginTop: '50px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography variant="h5" component="h2" mb={'30px'}>
          Appointments
        </Typography>
        <Typography variant="h4" component="h1" mb={'30px'}>
          {mappedAppointments}
        </Typography>
      </Box>
    </Box>
  );
}
