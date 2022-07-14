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
import { logout } from "../shared/utils/auth";
import { setUser } from "../store/reducers/authReducer";
import Home from "../shared/components/Home";
import PeopleIcon from "@mui/icons-material/People";
import PaymentIcon from "@mui/icons-material/Payment";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import { useHistory } from "react-router-dom";
import { handleAuth, handleUserRole } from "../shared/utils/auth";
import {
  appointmentBookingCancel,
  getAllAppointments,
  deleteOneAppointment,
  getAppointmentsForClientId,
} from "../store/reducers/scheduleReducer";
const filterLists = [
  { name: "Show All", color: "#191970" },
  { name: "Upcoming", color: "#4682B4" },
  { name: "Unbooked", color: "#90EE90" },
  { name: "Past", color: "#778899" },
  { name: "Canceled", color: "#FA8072" },
];
const drawerWidth = 300;
const menuItems = [
  {
    id: "Home",
    icon: <PeopleIcon />,
  },
  { id: "Calendar", icon: <CalendarMonthIcon /> },
  { id: "Payments", icon: <PaymentIcon /> },
  { id: "Meeting", icon: <VideoCameraFrontIcon /> },
];
// const appointmentStatusFilterOptionList = ['Past', 'Canceled', 'Upcoming'];

const ClientDashboard = () => {
  handleAuth();
  const history = useHistory();
  const dispatch = useDispatch();
  // return user if not logged in

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    console.log("CLIENT DASHBOARD USER", meetingId);
    if (user.role !== "client") {
      history.push("/consultantDashboard");
    }
  }, []);

  const { selectedNavigatorItem } = useSelector((state) => state.dashboard);
  const { meetingId } = useSelector((state) => state.meeting);

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
            {selectedNavigatorItem === "Calendar" && <>schedule</>}
            {selectedNavigatorItem === "Payments" && <>payments</>}
            {selectedNavigatorItem === "Meeting" && (
              <Meeting meetingId={meetingId} />
            )}
          </Box>
          <Box component="footer" sx={{ p: 2, bgcolor: "#eaeff1" }}>
            <Copyright />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default ClientDashboard;
