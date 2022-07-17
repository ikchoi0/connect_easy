import * as React from "react";
import { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Navigator from "../shared/components/Navigator";
import Scheduler from "../Scheduler/Scheduler";
import Meeting from "../Meeting/Meeting";
import { useDispatch, useSelector } from "react-redux";
import { theme } from "../shared/components/theme";
import Copyright from "../shared/components/Copyright";
import Home from "../shared/components/Home";
import PeopleIcon from "@mui/icons-material/People";
import PaymentIcon from "@mui/icons-material/Payment";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useHistory } from "react-router-dom";
import { handleAuth, handleUserRole } from "../shared/utils/auth";
import { io } from "socket.io-client";
import { showSuccessMessage } from "../store/reducers/alertReducer";
import DialogPopUp from "../shared/components/DialogPopUp";
import ConfirmModal from "../shared/components/ConfirmModal";
import { updateSelectedNavigatorItem } from "../store/reducers/dashboardReducer";
import {
  appointmentBookingCancel,
  getAllAppointments,
  deleteOneAppointment,
  getAppointmentsForClientId,
} from "../store/reducers/scheduleReducer";
import { updateMeetingId } from "../store/reducers/meetingReducer";

const socket = io("http://localhost:5002");
// const socket = io("https://connect-easy-rid.herokuapp.com");
const filterLists = [
  { name: "Show All", color: "#191970" },
  { name: "Upcoming", color: "#4682B4" },
  { name: "Past", color: "#778899" },
  // { name: "Canceled", color: "#FA8072" },
];
const drawerWidth = 300;
const menuItems = [
  {
    id: "Home",
    icon: <PeopleIcon />,
  },
  { id: "Calendar", icon: <CalendarMonthIcon /> },
  { id: "Payments", icon: <PaymentIcon /> },
  // { id: "Meeting", icon: <VideoCameraFrontIcon /> },
];
// const appointmentStatusFilterOptionList = ['Past', 'Canceled', 'Upcoming'];

const ClientDashboard = () => {
  handleAuth();
  const history = useHistory();
  const dispatch = useDispatch();
  const [confirm, setConfirm] = useState(false);
  const [message, setMessage] = useState("");
  // return user if not logged in
  const { selectedNavigatorItem } = useSelector((state) => state.dashboard);
  const { meetingId } = useSelector((state) => state.meeting);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user.role !== "client") {
      history.push("/consultantDashboard");
    }
    socket.emit("connected", user.userId);
    socket.on("join_meeting", (appointment) => {
      if (!JSON.parse(localStorage.getItem("activeMeeting"))) {
        dispatch(updateMeetingId(appointment.appointmentId));
        console.log(appointment);
        user && user.role === "client"
          ? setMessage(appointment.consultant)
          : setMessage(appointment.client);
        setConfirm(true);
      }
      // dispatch(showSuccessMessage("Please join the meeting!"));
    });
    socket.on("meeting_ended", () => {
      // add router to show alert before redirecting to dashboard
      alert("Meeting ended");
      localStorage.removeItem("activeMeeting");
      setTimeout(() => {
        window.location.replace("/dashboard");
      }, 2000);
    });
    console.log("CLIENT DASHBOARD USER", meetingId);
  }, []);
  const handleDismissOnClick = () => {
    const activeMeeting = localStorage.getItem("activeMeeting");
    if (activeMeeting) {
      localStorage.removeItem("activeMeeting");
    }
    setConfirm(false);
  };

  const handleConfirmClose = () => {
    localStorage.setItem("activeMeeting", JSON.stringify(meetingId));
    dispatch(updateSelectedNavigatorItem("Meeting"));
    setConfirm(false);
  };

  const handleCardButton = (appointmentId) => {
    dispatch(appointmentBookingCancel(appointmentId));
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        <CssBaseline />
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
          <Navigator menuItems={menuItems} drawerWidth={drawerWidth} />
        </Box>
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Box
            component="main"
            sx={{ flex: 1, py: 6, px: 4, bgcolor: "#eaeff1" }}
          >
            {selectedNavigatorItem === "Home" && (
              <Home
                getAppointmentAction={getAppointmentsForClientId}
                appointmentStatusFilterOptionList={[
                  "Past",
                  "Canceled",
                  "Upcoming",
                  "Show All",
                ]}
                buttonLabel="Cancel"
                handleCardButton={handleCardButton}
              />
            )}
            {selectedNavigatorItem === "Calendar" && (
              <Scheduler filterLists={filterLists} />
            )}
            {selectedNavigatorItem === "Payments" && <>payments</>}
            {selectedNavigatorItem === "Meeting" && (
              <Meeting meetingId={meetingId} socket={socket} />
            )}
          </Box>
          <Box component="footer" sx={{ p: 2, bgcolor: "#eaeff1" }}>
            <Copyright />
          </Box>
        </Box>
      </Box>
      <DialogPopUp open={confirm}>
        <ConfirmModal
          onConfirm={handleConfirmClose}
          onCancel={handleDismissOnClick}
          message={`${message} joined your meeting! Do you want to join?`}
        />
      </DialogPopUp>
    </ThemeProvider>
  );
};

export default ClientDashboard;
