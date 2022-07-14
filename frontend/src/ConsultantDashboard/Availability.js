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
import TextFieldWithLabel from "../shared/components/TextFieldWithLabel";
import moment from "moment";
import AppointmentCard from "../shared/components/AppointmentCard";
import { useSelector, useDispatch } from "react-redux";
import {
  setOneAppointment,
  deleteOneOpeningAppointment,
} from "../store/reducers/scheduleReducer";
import {
  createOpenAppointments,
  clearOpeningAppointmentsList,
} from "../store/reducers/scheduleReducer";
import {
  showAlertMessage,
  showSuccessMessage,
} from "../store/reducers/alertReducer";

export default function Availability() {
  const { openingAppointmentsList } = useSelector((state) => state.scheduler);
  const dispatch = useDispatch();

  const [isFormValid, setIsFormValid] = useState(false);
  const [isTimeValid, setIsTimeValid] = useState(false);
  // const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(null);
  const [isNewAppointmentValid, setIsNewAppointmentValid] = useState(false);

  /**
   * TODO: NEED TO FIX FORM VALIDATION
   */

  useEffect(() => {
    if (
      openingAppointmentsList.length &&
      // description &&
      date &&
      startTime &&
      endTime
    ) {
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
    setIsFormValid,
    // description,
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
        // description={appointment.description}
        date={moment.utc(appointment.date).local().format()}
        startTime={moment(appointment.appointmentStartTime).format("HH:mm")}
        endTime={moment(appointment.appointmentEndTime).format("HH:mm")}
        handleCardButton={handleDeleteAppointmentOnClick}
        buttonLabel={"Delete"}
      />
    );
  });

  const handleCreateButton = () => {
    const consultant = localStorage.getItem("user");
    const consultantId = JSON.parse(consultant).userId;

    const key = uuid();

    let card = {
      key,
      consultant: consultantId,
      date: moment(date)
        .utcOffset(0)
        .hours(0)
        .minutes(0)
        .seconds(0)
        .milliseconds(0)
        .toISOString(),
      appointmentStartTime: moment(startTime).toISOString(),
      appointmentEndTime: moment(endTime).toISOString(),
      // description,
    };

    if (card.appointmentEndTime && card.appointmentStartTime) {
      if (
        moment(card.appointmentEndTime).isAfter(
          moment(card.appointmentStartTime)
        )
      ) {
        dispatch(showSuccessMessage("Appointment added successfully"));
        dispatch(setOneAppointment(card));
      } else {
        dispatch(showAlertMessage("End time must be after start time"));
      }
    } else {
      dispatch(showAlertMessage("Please enter valid time"));
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

          {/* <TextFieldWithLabel
            id="description"
            label="Description"
            autoFocus={true}
            value={description}
            setValue={setDescription}
          /> */}
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
            />
            <TimePicker
              label="End Time"
              value={endTime}
              onChange={handleEndTimeChange}
              renderInput={(params) => <TextField {...params} />}
            />{" "}
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
