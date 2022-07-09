import React, { useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

import "./Scheduler.css";
import { Container, Box } from "@mui/material";
import TimeSlots from "./TimeSlots";
import { useDispatch, useSelector } from "react-redux";
import { getAllAppointments } from "../store/reducers/scheduleReducer";
// Setup the localizer by providing the moment (or globalize, or Luxon) Object
// to the correct localizer.
const localizer = momentLocalizer(moment); // or globalizeLocalizer

/**
 * https://jquense.github.io/react-big-calendar/
 */

export default function Scheduler({ selectable = true, consultantId }) {
  const [selectedEvent, setSelectedEvent] = React.useState(null);
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const scheduler = useSelector((state) => state.scheduler);
  const role = JSON.parse(localStorage.getItem("user")).role;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllAppointments(consultantId));
  }, [dispatch]);

  const handleOpenTimeSlots = (e) => {
    setSelectedDate(e.start);
  };
  return (
    <>
      <Container
        sx={{
          marginTop: 8,
          height: "780px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ width: "100%" }}>
          <Calendar
            events={scheduler ? scheduler.appointments : []}
            localizer={localizer}
            showMultiDayTimes
            step={30}
            views={["month"]}
            defaultView={"month"}
            startAccessor="start"
            endAccessor="end"
            // onSelectEvent={(e) => {
            //   console.log(e);
            // }}
            onSelectSlot={(e) => {
              console.log(e);
              handleOpenTimeSlots(e);
            }}
            selectable={selectable}
          />
        </Box>
        {role === "client" && (
          <TimeSlots selectedDate={selectedDate} consultantId={consultantId} />
        )}
        {/* <TimeSlots selectedDate={selectedDate} consultantId={consultantId} /> */}
      </Container>
    </>
  );
}
