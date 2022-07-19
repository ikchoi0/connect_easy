import React, { useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

import "./Scheduler.css";
import { Container, Box, Button } from "@mui/material";
import TimeSlots from "./TimeSlots";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllAppointments,
  getAppointmentsForClientId,
} from "../store/reducers/scheduleReducer";
import { handleAuth } from "../shared/utils/auth";
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
  const [timeSelected, setTimeSelected] = React.useState(false);

  const scheduler = useSelector((state) => state.scheduler);
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();

  useEffect(() => {
    if (consultantId) {
      dispatch(getAllAppointments(consultantId));
    } else if (user.role === "client") {
      dispatch(getAppointmentsForClientId(user.userId));
    }
  }, [dispatch]);

  const filterButtons =
    filterLists &&
    filterLists.map((item) => {
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
    setTimeSelected(false);
    setSelectedAppointmentId("");
    setDescription("");
    setSelectedDate(e.start);
  };
  const handleEventClick = (e) => {
    setTimeSelected(false);
    setSelectedDate(new Date(e.start));
  };
  return (
    <>
      <Container
        maxWidth="xl"
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
        </Box>
        {user.role === "client" && consultantId && (
          <TimeSlots
            timeSelected={timeSelected}
            setTimeSelected={setTimeSelected}
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
      <Box sx={{ display: "flex", justifyContent: "center", gap: "0.5rem" }}>
        {filterButtons}
      </Box>
    </>
  );
}
