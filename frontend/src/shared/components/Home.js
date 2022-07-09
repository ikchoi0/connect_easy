import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import AppointmentCard from "./AppointmentCard";
import { useDispatch, useSelector } from "react-redux";
import { deleteOneAppointment } from "../../store/reducers/scheduleReducer";

import moment from "moment";

export default function Home({
  getAppointmentAction,
  appointmentStatusFilterOptionList,
  buttonLabel,
  handleCardButton,
}) {
  // Grab the all appointments for the user above from the store:
  const { appointments } = useSelector((state) => state.scheduler);
  const userDetails = JSON.parse(localStorage.getItem("user"));
  // Filter menu for appointment status types:
  const [filterStatus, setFilterStatus] = React.useState("");
  const dispatch = useDispatch();
  const handleChange = (event) => {
    setFilterStatus(event.target.value);
  };

  useEffect(() => {
    dispatch(getAppointmentAction(userDetails.userId));
  }, [dispatch]);

  // // Delete an appointment:
  // const handleDeleteAppointmentOnClick = (id) => {
  //   dispatch(deleteOneAppointment(id));
  // };

  const menuItem = appointmentStatusFilterOptionList.map((option, idx) => {
    return (
      <MenuItem key={idx} value={option}>
        {option}
      </MenuItem>
    );
  });

  // Mapped appointments for the user:  scheduler.appointments
  const mappedAppointments = appointments.map((appointment, index) => {
    return (
      <AppointmentCard
        role={JSON.parse(localStorage.getItem("user")).role}
        clientName={appointment.client}
        consultantName={appointment.consultant}
        key={index}
        id={appointment.appointmentId}
        description={appointment.description}
        date={appointment.date}
        startTime={moment(appointment.start).format("HH:mm A")}
        endTime={moment(appointment.end).format("HH:mm A")}
        // onDelete={handleDeleteAppointmentOnClick}
        buttonLabel={buttonLabel}
        handleCardButton={handleCardButton}
        appointmentBooked={appointment.appointmentBooked}
      />
    );
  });

  return (
    <Box
      sx={{
        maxWidth: "100%",
        minHeight: "50vh",
        padding: "20px",
        height: "auto",
        backgroundColor: "#fafafa",
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
          maxWidth: "30%",
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
          {menuItem}
        </Select>
      </FormControl>

      <Box
        sx={{
          marginTop: "20px",
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
          {mappedAppointments}
        </Typography>
      </Box>
    </Box>
  );
}