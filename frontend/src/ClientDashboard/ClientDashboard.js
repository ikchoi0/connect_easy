import * as React from "react";
import { useState } from "react";
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
import { useHistory } from "react-router-dom";

const drawerWidth = 300;
const menuItems = [
  {
    id: "Home",
    icon: <PeopleIcon />,
  },
  { id: "Calendar", icon: <CalendarMonthIcon /> },
  { id: "Payments", icon: <PaymentIcon /> },
];

const ClientDashboard = () => {
  const history = useHistory();

  const userDetails = JSON.parse(localStorage.getItem("user"));
  if (userDetails.role !== "client") {
    history.push("/dashboard");
  }
  const { selectedNavigatorItem } = useSelector((state) => state.dashboard);
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
            {selectedNavigatorItem === "Home" && <Home />}
            {selectedNavigatorItem === "Payments" && <>payments</>}
            {selectedNavigatorItem === "Payments" && <>payments</>}
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
