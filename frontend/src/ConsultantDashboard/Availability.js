import * as React from "react";
import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { Container } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import Stack from "@mui/material/Stack";
import moment from "moment";
import AppointmentCard from "../shared/components/AppointmentCard";
import { useSelector, useDispatch } from "react-redux";
import {
  setOneAppointment,
  deleteOneOpeningAppointment,
  createOpenAppointments,
  clearOpeningAppointmentsList,
  getAllAppointments,
} from "../store/reducers/scheduleReducer";

import {
  showAlertMessage,
  showSuccessMessage,
} from "../store/reducers/alertReducer";

export default function Availability() {
  const { openingAppointmentsList } = useSelector((state) => state.scheduler);
  const { appointments } = useSelector((state) => state.scheduler);
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();

  const [isFormValid, setIsFormValid] = useState(false);
  const [date, setDate] = useState(moment().toISOString());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(null);
  const [isNewAppointmentValid, setIsNewAppointmentValid] = useState(false);

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
  }, [
    openingAppointmentsList,
    appointments,
    setIsFormValid,
    date,
    startTime,
    endTime,
  ]);

  const parseDate = (value, setValue) => {
    const time = moment(value).format("HH:mm");
    const newDate = moment(date).format("YYYY-MM-DD");
    const result = moment(newDate + " " + time).format("YYYY-MM-DD HH:mm");

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
        date={moment.utc(appointment.date).local(true).format()}
        startTime={moment(appointment.appointmentStartTime).format("h:mm a")}
        endTime={moment(appointment.appointmentEndTime).format("h:mm a")}
        handleCardButton={handleDeleteAppointmentOnClick}
        buttonLabel={"Delete"}
        unbookedString={""}
      />
    );
  });

  const handleCreateButton = () => {
    const consultant = localStorage.getItem("user");
    const consultantId = JSON.parse(consultant).userId;

    const key = uuid();

    const newDate = moment(date).format("YYYY-MM-DD");
    const newStartTime = moment(startTime).format("HH:mm");
    const newEndTime = moment(endTime).format("HH:mm");

    let card = {
      key,
      consultant: consultantId,
      date: moment(date)
        .hours(0)
        .minutes(0)
        .seconds(0)
        .milliseconds(0)
        .toISOString(true),
      appointmentStartTime: moment(newDate + " " + newStartTime).toISOString(
        true
      ),
      appointmentEndTime: moment(newDate + " " + newEndTime).toISOString(true),
    };


    let isOverlapDb = false;

    //check if the appointment is overlapping with the existing appointments from db
    for (const ap of appointments) {
      if (ap.appointmentBooked || ap.appointmentCancel) {
        continue;
      }
      const dbDate = moment(ap.date).format("YYYY-MM-DD");
      const dbStartTime = moment(ap.start).format("HH:mm");
      const dbEndTime = moment(ap.end).format("HH:mm");

      const newStartTime = moment(dbDate + " " + dbStartTime);
      const newEndTime = moment(dbDate + " " + dbEndTime);

      const cardStartTime = moment(card.appointmentStartTime);
      const cardEndTime = moment(card.appointmentEndTime);

      if (
        cardStartTime.isBetween(newStartTime, newEndTime, "minutes", "[]") ||
        cardEndTime.isBetween(newStartTime, newEndTime, "minutes", "[]")
      ) {
        isOverlapDb = true;
        break;
      }
      if (
        newStartTime.isAfter(cardStartTime) &&
        newEndTime.isBefore(cardEndTime)
      ) {
        isOverlapDb = true;
        break;
      }
    }

    //if overlap with db, show alert message
    if (isOverlapDb) {
      dispatch(showAlertMessage("Appointment overlaps with DB"));
      return;
    }

    if (!openingAppointmentsList.length && !isOverlapDb) {
      const compareStart = moment(card.appointmentStartTime);
      const compareEnd = moment(card.appointmentEndTime);

      if (compareEnd.isAfter(compareStart)) {
        dispatch(showSuccessMessage("Appointment added successfully"));
        dispatch(setOneAppointment(card));
        dispatch(getAllAppointments(user.userId));
        return;
      } else {
        dispatch(showAlertMessage("Start time must be before end time"));
        return;
      }
    }

    //if no overlap with db, check  opened appointment from the store
    let isOverlap = false;
    if (openingAppointmentsList.length > 0 && !isOverlapDb) {
      for (const appointment of openingAppointmentsList) {
        const startTime = moment(appointment.appointmentStartTime);
        const endTime = moment(appointment.appointmentEndTime);
        const cardStartTime = moment(card.appointmentStartTime);
        const cardEndTime = moment(card.appointmentEndTime);

        //check if start time is same or after end time
        if (cardStartTime.isSameOrAfter(cardEndTime)) {
          dispatch(showAlertMessage("Start time must be before end time"));
          return;
        }

        if (
          cardStartTime.isBetween(startTime, endTime, "minutes", "[]") ||
          cardEndTime.isBetween(startTime, endTime, "minutes", "[]")
        ) {
          isOverlap = true;
          break;
        }

        if (startTime.isAfter(cardStartTime) && endTime.isBefore(cardEndTime)) {
          isOverlap = true;
          break;
        }
      }
      //if overlap, show alert message
      if (isOverlap) {
        dispatch(
          showAlertMessage("Appointment overlaps with existing appointment")
        );
        return;
      } else {
        dispatch(showSuccessMessage("Appointment created"));
        dispatch(setOneAppointment(card));
        dispatch(getAllAppointments(user.userId));
        setStartTime(moment(endTime).toISOString());

        return;
      }
    }
  };

  const handleSaveAppointmentsButton = () => {
    dispatch(createOpenAppointments(openingAppointmentsList));
    dispatch(clearOpeningAppointmentsList());
    dispatch(getAllAppointments(user.userId));
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
              display: "flex",
              justifyContent: "space-around",
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
              shouldDisableTime={(timeValue, clockType) => {
                if (clockType === "minutes" && timeValue % 5) {
                  return true;
                }
              }}
            />
            <TimePicker
              label="End Time"
              value={endTime}
              onChange={handleEndTimeChange}
              renderInput={(params) => <TextField {...params} />}
              shouldDisableTime={(timeValue, clockType) => {
                if (clockType === "minutes" && timeValue % 5) {
                  return true;
                }

                return false;
              }}
            />
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
