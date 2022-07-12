import React, { useState, useEffect } from "react";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Navigator from "../shared/components/Navigator";
import Scheduler from "../Scheduler/Scheduler";
import { useDispatch, useSelector } from "react-redux";
import { theme } from "../shared/components/theme";
import Copyright from "../shared/components/Copyright";
import { logout } from "../shared/utils/auth";
import { setUser } from "../store/reducers/authReducer";
import Home from "../shared/components/Home";
import PeopleIcon from "@mui/icons-material/People";
import PaymentIcon from "@mui/icons-material/Payment";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import Availability from "./Availability";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import { useHistory } from "react-router-dom";
import { handleAuth, handleUserRole } from "../shared/utils/auth";
import {
  appointmentBookingCancel,
  getAllAppointments,
  deleteOneAppointment,
  getAppointmentsForClientId,
} from "../store/reducers/scheduleReducer";
import ProfilePage from "../shared/pages/ProfilePage";
import Meeting from "../Meeting/Meeting";

const drawerWidth = 300;
const menuItems = [
  {
    id: "Home",
    icon: <PeopleIcon />,
  },
  { id: "Availability", icon: <AddCircleOutlineIcon /> },
  { id: "Calendar", icon: <CalendarMonthIcon /> },
  { id: "Payments", icon: <PaymentIcon /> },
  { id: "Settings", icon: <SettingsApplicationsIcon /> },
  { id: "Meeting", icon: <VideoCameraFrontIcon /> },
];
// const appointmentStatusFilterOptionList = ['Past', 'Canceled', 'Upcoming'];

const ClientDashboard = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  // return user if not logged in
  handleAuth();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user.role !== "consultant") {
      history.push("/clientDashboard");
    }
  }, []);
  const { selectedNavigatorItem } = useSelector((state) => state.dashboard);
  const { meetingId } = useSelector((state) => state.meeting);

  const handleCardButton = (appointmentId) => {
    dispatch(deleteOneAppointment(appointmentId));
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
                getAppointmentAction={getAllAppointments}
                appointmentStatusFilterOptionList={[
                  "Past",
                  "Canceled",
                  "Unbooked",
                  "Upcoming",
                  "Show All",
                ]}
                buttonLabel="Delete"
                handleCardButton={handleCardButton}
              />
            )}
            {selectedNavigatorItem === "Availability" && <Availability />}
            {selectedNavigatorItem === "Calendar" && <Scheduler />}
            {selectedNavigatorItem === "Payments" && <>payments</>}
            {selectedNavigatorItem === "Settings" && <ProfilePage />}
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
