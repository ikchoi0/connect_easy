import React, { useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

import "./Scheduler.css";
import { Container, Box, Button } from "@mui/material";
import TimeSlots from "./TimeSlots";
import { useDispatch, useSelector } from "react-redux";
import { getAllAppointments } from "../store/reducers/scheduleReducer";
import { handleAuth } from "../shared/utils/auth";
import { bgcolor, color } from "@mui/system";
import { filterAppointments } from "../shared/utils/filterAppointments";
// Setup the localizer by providing the moment (or globalize, or Luxon) Object
// to the correct localizer.
const localizer = momentLocalizer(moment); // or globalizeLocalizer

/**
 * https://jquense.github.io/react-big-calendar/
 */

export default function Scheduler({
  selectable = true,
  consultantId,
  filterLists,
}) {
  handleAuth();

  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [description, setDescription] = React.useState("");
  const [selectedAppointmentId, setSelectedAppointmentId] = React.useState("");
  const [filterName, setFilterName] = React.useState("Show All");

  const scheduler = useSelector((state) => state.scheduler);
  const role = JSON.parse(localStorage.getItem("user")).role;
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(scheduler);
    if (consultantId) {
      dispatch(getAllAppointments(consultantId));
    }
  }, [dispatch]);

  const filterButtons = filterLists.map((item) => {
    return (
      <Button
        key={item.name}
        onClick={(e) => {
          e.preventDefault();
          setFilterName(item.name);
        }}
        variant="contained"
        sx={{
          bgcolor: item.color,
          color: "white",
          ":hover": { bgcolor: "white", color: item.color },
        }}
      >
        {item.name}
      </Button>
    );
  });
  const filteredAppointments = filterAppointments(
    scheduler.appointments,
    filterName
  );
  const handleOpenTimeSlots = (e) => {
    console.log(selectedDate);
    setSelectedAppointmentId("");
    setDescription("");
    setSelectedDate(e.start);
  };
  const handleEventClick = (e) => {
    setSelectedDate(new Date(e.start));
  };
  return (
    <>
      <Container
        sx={{
          marginTop: 8,
          marginBottom: 4,
          height: "780px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            width: "100%",
          }}
        >
          <Calendar
            onSelectEvent={handleEventClick}
            events={scheduler ? filteredAppointments : []}
            localizer={localizer}
            showMultiDayTimes
            step={30}
            views={["month"]}
            defaultView={"month"}
            startAccessor="start"
            endAccessor="end"
            onSelectSlot={handleOpenTimeSlots}
            selectable={selectable}
            eventPropGetter={(event) => {
              const backgroundColor = event && event.color;
              return { style: { backgroundColor } };
            }}
          />
          <Box
            sx={{ display: "flex", justifyContent: "center", gap: "0.5rem" }}
          >
            {filterButtons}
          </Box>
        </Box>
        {role === "client" && (
          <TimeSlots
            selectedDate={selectedDate}
            consultantId={consultantId}
            description={description}
            setDescription={setDescription}
            selectedAppointmentId={selectedAppointmentId}
            setSelectedAppointmentId={setSelectedAppointmentId}
            consultantInfo={scheduler ? scheduler.appointments[0] : null}
          />
        )}
      </Container>
    </>
  );
}
