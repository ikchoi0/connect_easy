import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';
import Logo from './Logo';
import { logout } from '../../shared/utils/auth';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { createTheme, ThemeProvider } from "@mui/material/styles";
const theme = createTheme();

const companyName = 'Connect Easy';

const smLogoStyle = {
  mr: 2,
  display: { xs: 'flex', md: 'none' },
  flexGrow: 1,
  fontFamily: 'monospace',
  fontWeight: 700,
  letterSpacing: '.3rem',
  color: 'inherit',
  textDecoration: 'none',
};

const lgLogoStyle = {
  mr: 2,
  display: { xs: 'none', md: 'flex' },
  fontFamily: 'monospace',
  fontWeight: 700,
  letterSpacing: '.3rem',
  color: 'inherit',
  textDecoration: 'none',
};

const smLogoIconStyle = { display: { xs: 'flex', md: 'none' }, mr: 1 };
const lgLogoIconStyle = { display: { xs: 'none', md: 'flex' }, mr: 1 };

const HomePageAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const userDetails = JSON.parse(localStorage.getItem('user'));

  const history = useHistory();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleRegisterOnClick = () => {
    history.push('/register');
  };

  const handleLoginOnClick = () => {
    history.push('/login');
  };

  const handleLogoutOnClick = () => {
    logout();
  };

  const handleLogoOnClick = () => {
    history.push('/');
  };

  const handleDashBoardOnClick = () => {
    if (userDetails.role === 'consultant') {
      history.push('/consultantDashboard');
    } else {
      history.push('/clientDashboard');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Logo
              name={companyName}
              logoStyle={lgLogoStyle}
              iconStyle={lgLogoIconStyle}
              handleLogoOnClick={handleLogoOnClick}
            />

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </Box>

            <Logo
              name={companyName}
              logoStyle={smLogoStyle}
              iconStyle={smLogoIconStyle}
            />

            <Box sx={{ flexGrow: 0 }}>
              {userDetails &&
              (userDetails.role === "client" || " consultant") ? (
                <>
                  <Button
                    sx={{ color: "white" }}
                    startIcon={<DashboardIcon />}
                    onClick={handleDashBoardOnClick}
                  >
                    DashBoard
                  </Button>
                  <Button
                    sx={{ color: "white" }}
                    startIcon={<LogoutIcon />}
                    onClick={handleLogoutOnClick}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    sx={{ color: "white" }}
                    startIcon={<LockOpenIcon />}
                    onClick={handleRegisterOnClick}
                  >
                    Register
                  </Button>
                  <Button
                    sx={{ color: "white" }}
                    startIcon={<LoginIcon />}
                    onClick={handleLoginOnClick}
                  >
                    Login
                  </Button>
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};
export default HomePageAppBar;
