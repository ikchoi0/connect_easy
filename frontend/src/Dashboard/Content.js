import * as React from 'react';
import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { Card, Container } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import Stack from '@mui/material/Stack';
import TextFieldWithLabel from '../shared/components/TextFieldWithLabel';
import moment from 'moment';
import AppointmentCard from './AppointmentCard';
import { useSelector, useDispatch } from 'react-redux';
import Grid from '@mui/material/Grid';
import { setOneAppointment } from '../store/reducers/scheduleReducer';
import { createOpenAppointments } from '../store/reducers/scheduleReducer';

export default function Content() {
  const { openingAppointmentsList } = useSelector((state) => state.scheduler);
  const dispatch = useDispatch();

  const [isFormValid, setIsFormValid] = useState(false);
  useEffect(() => {
    if (openingAppointmentsList.length) {
      setIsFormValid(true);
    }
  }, [openingAppointmentsList, setIsFormValid]);

  const [description, setDescription] = useState('');
  const [date, setDate] = useState(moment().toDate());
  const [startTime, setStartTime] = useState(moment().toDate());
  const [endTime, setEndTime] = useState(moment().add(30, 'minutes').toDate());

  const parseDate = (value, setValue) => {
    const time = moment(value).format('HH:mm');
    const newDate = moment(date).format('YYYY-MM-DD');
    const result = moment(newDate + ' ' + time).format('YYYY-MM-DD HH:mm');

    setValue(result);
    return result;
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

  const appointmentCards = openingAppointmentsList.map((appointment, index) => {
    return (
      <AppointmentCard
        key={index}
        description={appointment.description}
        date={appointment.date}
        startTime={appointment.appointmentStartTime}
        endTime={appointment.appointmentEndTime}
      />
    );
  });

  let cards = (
    <Card sx={{ margin: 2 }}>
      <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="center">
        {description}
      </Typography>
    </Card>
  );

  const handleCreateButton = () => {
    let card = {
      date: date.toString(),
      appointmentStartTime: startTime.toString(),
      appointmentEndTime: endTime.toString(),
      description,
    };
    dispatch(setOneAppointment(card));
  };

  const handleSaveAppointmentsButton = () => {
    dispatch(createOpenAppointments(openingAppointmentsList));
  };

  return (
    <Container sx={{ py: 8 }} maxWidth="md">
      {/* End hero unit */}
      <Card sx={{ margin: 2, overflow: 'hidden' }}>
        <Stack spacing={3}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Button
              variant="contained"
              sx={{ mr: 2, ml: 2, mt: 2 }}
              onClick={() => handleCreateButton()}
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
      </Card>
    </Container>
  );
}
