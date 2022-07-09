import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import AppointmentCard from "./AppointmentCard";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllAppointments,
  deleteOneAppointment,
} from "../store/reducers/scheduleReducer";
import getUserById from "../store/reducers/userReducer";
import moment from "moment";

export default function Home() {
  // Grab the all appointments for the user above from the store:
  const { appointments } = useSelector((state) => state.scheduler);
  const userDetails = JSON.parse(localStorage.getItem("user"));

  // Filter menu for appointment status types:
  const [filterStatus, setFilterStatus] = React.useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllAppointments(userDetails.userId));
  }, [dispatch]);

  // Delete an appointment:
  const handleDeleteAppointmentOnClick = (id) => {
    dispatch(deleteOneAppointment(id));
  };

  // Mapped appointments for the user:  scheduler.appointments
  const mappedAppointments = appointments.map((appointment, index) => {
    let description = appointment.description;
    if (description) {
      description = "unbooked";
    }
    return (
      <AppointmentCard
        clientName={appointment.clientName}
        consultantName={appointment.consultantName}
        key={index}
        id={appointment.appointmentId}
        description={appointment.description}
        date={appointment.date}
        startTime={moment(appointment.start).format("HH:mm A")}
        endTime={moment(appointment.end).format("HH:mm A")}
        onDelete={handleDeleteAppointmentOnClick}
      />
    );
  });

  const handleChange = (event) => {
    setFilterStatus(event.target.value);
  };

  return (
    <Box
      sx={{
        maxWidth: "100%",
        minHeight: "50vh",
        padding: "20px",
        height: "auto",
        display: "flex",
        flexDirection: "column",
        borderRadius: "5px",
      }}
    >
      <Typography variant="h4" component="h1" mb={"30px"}>
        Welcome, {userDetails && userDetails.firstName}{" "}
        {userDetails && userDetails.lastName}!
      </Typography>

      <FormControl
        sx={{
          maxWidth: "20%",
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
          <MenuItem value={"Unbooked"}>Unbooked</MenuItem>
          <MenuItem value={"Past"}>Past</MenuItem>
          <MenuItem value={"Canceled"}>Canceled</MenuItem>
          <MenuItem value={"Upcoming"}>Upcoming</MenuItem>
        </Select>
      </FormControl>

      <Box
        sx={{
          marginTop: "50px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h5" component="h2" mb={"30px"}>
          Appointments
        </Typography>
        <Typography variant="h4" component="h1" mb={"30px"}>
          {mappedAppointments}
        </Typography>
      </Box>
    </Box>
  );
}
