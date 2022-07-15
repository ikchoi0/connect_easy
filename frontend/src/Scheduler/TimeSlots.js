import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";

import { styled } from "@mui/material/styles";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAppointmentsForTheDay } from "../store/reducers/scheduleReducer";
import moment from "moment";
import SchedulerDetailsInputs from "./SchedulerDetailsInputs";
import { bookAppointment } from "../store/reducers/scheduleReducer";
import { useHistory } from "react-router-dom";
import DialogPopUp from "../shared/components/DialogPopUp";
import ConfirmModal from "../shared/components/ConfirmModal";

const Item = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  border: "2px solid #e0e0e0",
}));

export default function TimeSlots(props) {
  const [selectedDateText, setSelectedDateText] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");

  const [confirm, setConfirm] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const appointmentsForDay = useSelector(
    (state) => state.scheduler.appointmentsForSelectedDate
  );

  useEffect(() => {
    setSelectedDateText(props.selectedDate.toLocaleDateString());

    const date = moment(props.selectedDate).format("YYYY-MM-DD");

    dispatch(
      getAppointmentsForTheDay({ consultantId: props.consultantId, date })
    );
  }, [props.selectedDate, dispatch]);

  const handleDismissOnClick = () => {
    props.setSelectedAppointmentId("");
    props.setDescription("");
    setConfirm(false);
    props.setTimeSelected(false);
  };

  const handledBookingAppointment = () => {
    setConfirm(true);
  };

  const handleConfirmClose = () => {
    const appointmentData = {
      description: props.description,
      selectedAppointmentId: props.selectedAppointmentId,
    };
    console.log(appointmentData);

    dispatch(bookAppointment({ appointmentData, history }));
    setConfirm(false);
  };

  const items = appointmentsForDay.map((item) => (
    <div key={item.appointmentId}>
      <Button
        onClick={() => {
          // console.log(item);
          const start = moment(item.start).format("HH:mm");
          const end = moment(item.end).format("HH:mm");
          const timeSlot = `${start} - ${end}`;
          props.setTimeSelected(true);
          setSelectedTimeSlot(timeSlot);
          props.setSelectedAppointmentId(item.appointmentId);
        }}
        variant="contained"
        value={item.appointmentId}
      >
        <Box sx={{ display: "flex", gap: "1rem" }}>
          <Typography variant="subtitle1">
            {moment(item.start).format("HH:mm")}
          </Typography>

          <Typography variant="subtitle1">-</Typography>

          <Typography variant="subtitle1">
            {moment(item.end).format("HH:mm")}
          </Typography>
        </Box>
      </Button>
    </div>
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
        {selectedDateText}
      </Typography>

      <Box
        sx={{
          overflowY: "scroll",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        {!props.timeSelected && items && items}
        {props.timeSelected && items.length > 0 && props.selectedAppointmentId && (
          <>
            <Box sx={{ marginTop: "2rem" }}>
              <Typography variant="subtitle1" gutterBottom>
                For: {selectedTimeSlot}
              </Typography>
              <SchedulerDetailsInputs
                description={props.description}
                setDescription={props.setDescription}
              />
              {props.description.length > 0 && (
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Button onClick={handleDismissOnClick}>Dismiss</Button>
                  <Button onClick={handledBookingAppointment}>Book</Button>
                </Box>
              )}
            </Box>
          </>
        )}
      </Box>
      {confirm && (
        <DialogPopUp open={confirm}>
          <ConfirmModal
            onConfirm={handleConfirmClose}
            timeSlot={selectedTimeSlot}
            selectedDate={selectedDateText}
            consultantInfo={props.consultantInfo}
            onCancel={handleDismissOnClick}
          />
        </DialogPopUp>
      )}
    </Box>
  );
}
