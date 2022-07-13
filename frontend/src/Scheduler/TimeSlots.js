import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  Typography,
  ButtonGroup,
  Paper,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAppointmentsForTheDay } from "../store/reducers/scheduleReducer";
import moment from "moment";
import SchedulerDetailsInputs from "./SchedulerDetailsInputs";
import { bookAppointment } from "../store/reducers/scheduleReducer";
import { useHistory } from "react-router-dom";

const Item = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  border: "2px solid #e0e0e0",
}));

export default function TimeSlots(props) {
  const [description, setDescription] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedAppointmentId, setSelectedAppointmentId] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  const appointmentsForDay = useSelector(
    (state) => state.scheduler.appointmentsForSelectedDate
  );
  useEffect(() => {
    setSelectedDate(props.selectedDate.toLocaleDateString());

    const date = moment(props.selectedDate).format("YYYY-MM-DD");

    dispatch(
      getAppointmentsForTheDay({ consultantId: props.consultantId, date })
    );
  }, [props.selectedDate, dispatch]);

  const handleDismissOnClick = () => {
    setSelectedAppointmentId("");
  };

  const handledBookingAppointment = () => {
    const appointmentData = { description, selectedAppointmentId };

    dispatch(bookAppointment({ appointmentData, history }));
  };

  const items = appointmentsForDay.map((item) => (
    <Item key={item.appointmentId}>
      <div
        onClick={() => setSelectedAppointmentId(item.appointmentId)}
        value={item.appointmentId}
      >
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <Typography variant="subtitle1">
              {moment(item.start).format("HH:mm A")}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="subtitle1">- </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="subtitle1">
              {moment(item.end).format("HH:mm A")}
            </Typography>
          </Grid>
        </Grid>
      </div>
      {/* <Grid container spacing={1}>
        <Grid item xs={4}>
          <Typography variant="subtitle1">{item.start}</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="subtitle1">- </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="subtitle1">{item.end}</Typography>
        </Grid>
      </Grid> */}
    </Item>
  ));
  return (
    <Box
      sx={{
        width: "20%",
        marginLeft: 3,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h6" gutterBottom>
        {selectedDate}
      </Typography>

      <Stack spacing={2}>
        {!selectedAppointmentId ? (
          items
        ) : (
          <>
            <SchedulerDetailsInputs
              description={description}
              setDescription={setDescription}
            />
          </>
        )}
        {appointmentsForDay.length > 0 && (
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button onClick={handleDismissOnClick}>Dismiss</Button>
            <Button onClick={handledBookingAppointment}>Book</Button>
          </Box>
        )}
      </Stack>
    </Box>
  );
}
