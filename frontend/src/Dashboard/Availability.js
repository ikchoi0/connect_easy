import * as React from 'react';
import { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import { Container } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import Stack from '@mui/material/Stack';
import TextFieldWithLabel from '../shared/components/TextFieldWithLabel';
import moment from 'moment';
import AppointmentCard from './AppointmentCard';
import { useSelector, useDispatch } from 'react-redux';
import {
  setOneAppointment,
  deleteOneAppointment,
} from '../store/reducers/scheduleReducer';
import {
  createOpenAppointments,
  clearOpeningAppointmentsList,
} from '../store/reducers/scheduleReducer';

export default function Availability() {
  const { openingAppointmentsList } = useSelector((state) => state.scheduler);
  const dispatch = useDispatch();

  const [isFormValid, setIsFormValid] = useState(false);
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(moment().toDate());
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [isNewAppointmentValid, setIsNewAppointmentValid] = useState(false);

  useEffect(() => {
    if (
      openingAppointmentsList.length &&
      description &&
      date &&
      startTime &&
      endTime
    ) {
      setIsFormValid(true);
    }
    handleCreateAppointmentCheck();
  }, [
    openingAppointmentsList,
    setIsFormValid,
    description,
    date,
    startTime,
    endTime,
  ]);

  const parseDate = (value, setValue) => {
    const time = moment(value).format('HH:mm');
    const newDate = moment(date).format('YYYY-MM-DD');
    const result = moment(newDate + ' ' + time).format('YYYY-MM-DD HH:mm');

    setValue(result);
    return result;
  };

  const handleCreateAppointmentCheck = () => {
    setIsNewAppointmentValid(
      description.length && date && startTime && endTime ? true : false
    );
  };

  const handleDateChange = (newValue) => {
    setDate(newValue);
  };

  const handleStartTimeChange = (newValue) => {
    parseDate(newValue, setStartTime);
  };

  const handleEndTimeChange = (newValue) => {
    parseDate(newValue, setEndTime);
  };

  const handleDeleteAppointmentOnClick = (key) => {
    dispatch(deleteOneAppointment(key));
  };

  const appointmentCards = openingAppointmentsList.map((appointment, index) => {
    return (
      <AppointmentCard
        key={appointment.key}
        id={appointment.key}
        description={appointment.description}
        date={appointment.date}
        startTime={appointment.appointmentStartTime}
        endTime={appointment.appointmentEndTime}
        onDelete={handleDeleteAppointmentOnClick}
      />
    );
  });

  const handleCreateButton = () => {
    const consultant = localStorage.getItem('user');
    const consultantId = JSON.parse(consultant).userId;

    const key = uuid();

    let card = {
      key,
      consultant: consultantId,
      date: date.toString(),
      appointmentStartTime: startTime.toString(),
      appointmentEndTime: endTime.toString(),
      description,
    };

    dispatch(setOneAppointment(card));
  };

  const handleSaveAppointmentsButton = () => {
    dispatch(createOpenAppointments(openingAppointmentsList));
    dispatch(clearOpeningAppointmentsList());
  };

  return (
    <Container sx={{ py: 8 }} maxWidth="md">
      {/* End hero unit */}

      <Stack spacing={3}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Button
            variant="contained"
            sx={{ mr: 2, ml: 2, mt: 2 }}
            onClick={() => handleCreateButton()}
            disabled={!isNewAppointmentValid}
          >
            Create New Appointment
          </Button>

          <TextFieldWithLabel
            id="description"
            label="Description"
            autoFocus={true}
            value={description}
            setValue={setDescription}
          />
          <Grid
            sx={{
              display: 'flex',
              justifyContent: 'space-around',
            }}
          >
            <DesktopDatePicker
              minDate={new Date()}
              label="Appointment Date"
              inputFormat="MM/dd/yyyy"
              value={date}
              onChange={handleDateChange}
              renderInput={(params) => <TextField {...params} />}
            />
            <TimePicker
              label="Start Time"
              value={startTime}
              onChange={handleStartTimeChange}
              renderInput={(params) => <TextField {...params} />}
            />
            <TimePicker
              label="End Time"
              value={endTime}
              onChange={handleEndTimeChange}
              renderInput={(params) => <TextField {...params} />}
            />{' '}
          </Grid>
          {appointmentCards && appointmentCards}

          <Button
            variant="contained"
            sx={{ mr: 2, ml: 2, mt: 2 }}
            onClick={() => handleSaveAppointmentsButton()}
            disabled={appointmentCards && !isFormValid}
          >
            Save my time slots
          </Button>
        </LocalizationProvider>
      </Stack>
    </Container>
  );
}
