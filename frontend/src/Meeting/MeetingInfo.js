import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAppointmentByAppointmentId } from "../store/reducers/meetingReducer";
import { Box, Container, Typography, CardMedia, Grid } from "@mui/material";
import moment from "moment";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import TimelapseIcon from "@mui/icons-material/Timelapse";

const MeetingInfo = ({ meetingId }) => {
  const dispatch = useDispatch();
  const { appointmentData } = useSelector((state) => state.meeting);
  useEffect(() => {
    dispatch(getAppointmentByAppointmentId(meetingId));
  }, []);

  console.log("appointmentData: ", appointmentData);

  const meetingInfoStyles = {
    fontSize: "0.9rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    color: "#36454F",
  };
  return (
    <Box
      sx={{
        backgroundColor: "#e1e8eb",
        padding: "2px",
        borderRadius: "10px",
        marginBottom: "10px",
      }}
    >
      <Typography sx={meetingInfoStyles}>
        <AccountBoxIcon />
        <b>Consultant:&nbsp; </b>
        {appointmentData &&
          appointmentData.consultant.firstName +
            " " +
            appointmentData.consultant.lastName}
      </Typography>
      <Typography sx={meetingInfoStyles}>
        <AccountBoxIcon />
        <b>Client:&nbsp; </b>
        {appointmentData &&
          appointmentData.client.firstName +
            " " +
            appointmentData.client.lastName}
      </Typography>
      <Typography sx={meetingInfoStyles}>
        <TimelapseIcon />
        Time elapsed here...or remaining
      </Typography>
    </Box>
  );
};

export default MeetingInfo;
