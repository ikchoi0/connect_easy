import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAppointmentByAppointmentId } from "../store/reducers/meetingReducer";
import { Box, Typography } from "@mui/material";
import moment from "moment";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import TimelapseIcon from "@mui/icons-material/Timelapse";

const MeetingInfo = ({ meetingId, startTimer }) => {
  const dispatch = useDispatch();
  const [time, setTime] = useState(0);
  const { appointmentData } = useSelector((state) => state.meeting);

  useEffect(() => {
    dispatch(getAppointmentByAppointmentId(meetingId));
  }, []);

  useEffect(() => {
    let meetingStartTime = moment(new Date());
    if (appointmentData?.videoStartTime) {
      meetingStartTime = moment(appointmentData.videoStartTime);
    }
    const now = moment(new Date());
    setTime(now.diff(meetingStartTime, "seconds"));
  }, [appointmentData]);

  const timeNow = moment().hour(0).minute(0).second(time).format("HH:mm:ss");
  useEffect(() => {
    if (startTimer) {
      const interval = setInterval(() => {
        setTime(time + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [startTimer, time]);

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
        <b>Time elapsed:&nbsp; </b> {timeNow}
      </Typography>
    </Box>
  );
};

export default MeetingInfo;
