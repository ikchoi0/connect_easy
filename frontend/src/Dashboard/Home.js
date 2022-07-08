import React from "react";
import { Box, Typography } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import AppointmentCard from "./AppointmentCard";

const user = JSON.parse(localStorage.getItem("user"));
console.log(user);

export default function Home() {
  const [appointmentStatus, setAppointmentStatus] = React.useState("");

  const handleChange = (event) => {
    setAppointmentStatus(event.target.value);
  };

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
        Welcome, {user.email}!
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
          value={appointmentStatus}
          label="Appointment Status"
          onChange={handleChange}
        >
          <MenuItem value={"Past"}>Past</MenuItem>
          <MenuItem value={"Canceled"}>Canceled</MenuItem>
          <MenuItem value={"Upcoming"}>Upcoming</MenuItem>
        </Select>
      </FormControl>

      <Box
        sx={{
          marginTop: "20px",
          maxWidth: "100%",
          minHeight: "50vh",
          padding: "20px",
          height: "auto",
          backgroundColor: "#dbdbdb",
          display: "flex",
          flexDirection: "column",
          borderRadius: "5px",
        }}
      >
        <AppointmentCard
          description={"appointment.description"}
          date={"appointment.date"}
          startTime={"appointment.appointmentStartTime"}
          endTime={"appointment.appointmentEndTime"}
        />
      </Box>
    </Box>
  );
}
