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
import moment from 'moment';
import AppointmentCard from '../shared/components/AppointmentCard';
import { useSelector, useDispatch } from 'react-redux';
import {
  setOneAppointment,
  deleteOneOpeningAppointment,
} from '../store/reducers/scheduleReducer';
import {
  createOpenAppointments,
  clearOpeningAppointmentsList,
} from '../store/reducers/scheduleReducer';
import {
  showAlertMessage,
  showSuccessMessage,
} from '../store/reducers/alertReducer';

export default function Availability() {
  const { openingAppointmentsList } = useSelector((state) => state.scheduler);
  const dispatch = useDispatch();

  const [isFormValid, setIsFormValid] = useState(false);
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [isNewAppointmentValid, setIsNewAppointmentValid] = useState(false);

  const [currentSelectedStartTime, setCurrentSelectedStartTime] =
    useState(null);
  const [currentSelectedEndTime, setCurrentSelectedEndTime] = useState(null);

  const [tempAppointment, setTempAppointment] = useState([]);

  /**
   * TODO: NEED TO FIX FORM VALIDATION
   */

  useEffect(() => {
    if (openingAppointmentsList.length && date && startTime && endTime) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
    const handleCreateAppointmentCheck = () => {
      setIsNewAppointmentValid(date && startTime && endTime ? true : false);
    };
    handleCreateAppointmentCheck();
  }, [openingAppointmentsList, setIsFormValid, date, startTime, endTime]);

  const parseDate = (value, setValue) => {
    const time = moment(value).format('HH:mm');
    const newDate = moment(date).format('YYYY-MM-DD');
    const result = moment(newDate + ' ' + time).format('YYYY-MM-DD HH:mm');

    setValue(result);
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleStartTimeChange = (startTime) => {
    parseDate(startTime, setStartTime);
  };

  const handleEndTimeChange = (endTime) => {
    parseDate(endTime, setEndTime);
  };

  const handleDeleteAppointmentOnClick = (key) => {
    dispatch(deleteOneOpeningAppointment(key));
  };
  const appointmentCards = openingAppointmentsList.map((appointment) => {
    return (
      <AppointmentCard
        key={appointment.key}
        id={appointment.key}
        // description={appointment.description}
        date={moment.utc(appointment.date).local(true).format()}
        startTime={moment(appointment.appointmentStartTime).format('h:mm a')}
        endTime={moment(appointment.appointmentEndTime).format('h:mm a')}
        handleCardButton={handleDeleteAppointmentOnClick}
        buttonLabel={'Delete'}
        unbookedString={''}
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
      date: moment(date)
        .hours(0)
        .minutes(0)
        .seconds(0)
        .milliseconds(0)
        .toISOString(true),
      appointmentStartTime: moment(startTime).toISOString(true),
      appointmentEndTime: moment(endTime).toISOString(true),
      // description,
    };

    if (openingAppointmentsList.length) {
      let startFlag = true;
      let endFlag = true;

      for (const appointment of openingAppointmentsList) {
        const startTime = moment(appointment.appointmentStartTime);
        const endTime = moment(appointment.appointmentEndTime);
        const compareStart = moment(card.appointmentStartTime);
        const compareEnd = moment(card.appointmentEndTime);

        if (compareStart.isAfter(compareEnd)) {
          dispatch(showAlertMessage('Start time must be before end time'));
          return;
        }

        // compare if new starttime is within the range of an existing appointment
        startFlag = compareStart.isBetween(startTime, endTime, undefined, '[]');

        // compare if new endtime is within the range of an existing appointment
        endFlag = compareEnd.isBetween(startTime, endTime, undefined, '[]');

        // store the new appointment
      }
      if (!startFlag && !endFlag) {
        dispatch(showSuccessMessage('Appointment added successfully'));
        dispatch(setOneAppointment(card));
      } else {
        dispatch(
          showAlertMessage('Appointment overlaps with existing appointment')
        );
      }
    } else {
      const compareStart = moment(card.appointmentStartTime);
      const compareEnd = moment(card.appointmentEndTime);

      if (compareStart.isBefore(compareEnd)) {
        dispatch(showSuccessMessage('Appointment added successfully'));
        dispatch(setOneAppointment(card));
      } else {
        dispatch(showAlertMessage('Start time must be before end time'));
      }
    }
  };

  const handleSaveAppointmentsButton = () => {
    dispatch(createOpenAppointments(openingAppointmentsList));
    dispatch(clearOpeningAppointmentsList());
  };

  return (
    <Container sx={{ py: 8 }} maxWidth="md">
      <Stack spacing={2}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Button
            variant="contained"
            sx={{ mr: 0, ml: 0, mt: 2 }}
            onClick={() => handleCreateButton()}
            disabled={!isNewAppointmentValid}
          >
            Create New Time Slot
          </Button>

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
              onError={(error) => {
                dispatch(showAlertMessage('please select a valid time'));
                setStartTime(new Date());
              }}
              shouldDisableTime={(timeValue, clockType) => {
                if (clockType === 'minutes' && timeValue % 5) {
                  return true;
                }

                return false;
              }}
            />
            <TimePicker
              label="End Time"
              value={endTime}
              onChange={handleEndTimeChange}
              renderInput={(params) => <TextField {...params} />}
              onError={(error) => {
                dispatch(showAlertMessage('please select a valid time'));
                setEndTime(new Date());
              }}
              shouldDisableTime={(timeValue, clockType) => {
                if (clockType === 'minutes' && timeValue % 5) {
                  return true;
                }

                return false;
              }}
            />{' '}
          </Grid>
          {appointmentCards && appointmentCards}

          <Button
            variant="contained"
            sx={{ mr: 0, ml: 0, mt: 2 }}
            onClick={() => handleSaveAppointmentsButton()}
            disabled={appointmentCards && !isFormValid}
          >
            Save
          </Button>
        </LocalizationProvider>
      </Stack>
    </Container>
  );
}
