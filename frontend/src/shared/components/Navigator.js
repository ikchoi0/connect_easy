import * as React from "react";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LogoutIcon from "@mui/icons-material/Logout";
import Logo from "./Logo";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../shared/utils/auth";
import { updateSelectedNavigatorItem } from "../../store/reducers/dashboardReducer";
const companyName = "Connect Easy";

const lgLogoStyle = {
  mr: 2,
  display: { xs: "none", md: "flex" },
  fontFamily: "monospace",
  fontWeight: 700,
  letterSpacing: ".3rem",
  color: "inherit",
  textDecoration: "none",
};
const lgLogoIconStyle = { display: { xs: "none", md: "flex" }, mr: 1 };
const authMenuItems = { id: "Logout", icon: <LogoutIcon /> };

const item = {
  py: "2px",
  px: 3,
  color: "rgba(255, 255, 255, 0.7)",
  "&:hover, &:focus": {
    bgcolor: "rgba(255, 255, 255, 0.08)",
  },
};

const itemCategory = {
  boxShadow: "0 -1px 0 rgb(255,255,255,0.1) inset",
  py: 1.5,
  px: 3,
};

export default function Navigator(props) {
  const { menuItems, drawerWidth } = props;
  const dispatch = useDispatch();
  const history = useHistory();

  const handleNavigatorMenuClick = (childId) => {
    dispatch(updateSelectedNavigatorItem(childId));
  };

  const handleLogoOnClick = () => {
    history.push("/");
  };

  const handleLogoutOnClick = () => {
    logout();
  };

  return (
    <Drawer
      variant="permanent"
      PaperProps={{ style: { width: drawerWidth } }}
      sx={{ display: { sm: "block", xs: "none" } }}
    >
      <List disablePadding>
        <ListItem
          sx={{ ...item, ...itemCategory, fontSize: 22, color: "#fff" }}
        >
          <Logo
            name={companyName}
            logoStyle={lgLogoStyle}
            iconStyle={lgLogoIconStyle}
            handleLogoOnClick={handleLogoOnClick}
          />
        </ListItem>
        <ListItem sx={{ ...item, ...itemCategory }}>
          <ListItemText>Dashboard</ListItemText>
        </ListItem>

        {menuItems.map(({ id: childId, icon, active }) => (
          <ListItem disablePadding key={childId}>
            <ListItemButton
              selected={active}
              sx={item}
              onClick={() => {
                handleNavigatorMenuClick(childId);
              }}
            >
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText>{childId}</ListItemText>
            </ListItemButton>
          </ListItem>
        ))}

        <Divider sx={{ mt: 2 }} />
        <ListItemButton sx={item} onClick={handleLogoutOnClick}>
          <ListItemIcon>{authMenuItems.icon}</ListItemIcon>
          <ListItemText>{authMenuItems.id}</ListItemText>
        </ListItemButton>
      </List>
    </Drawer>
  );
}
