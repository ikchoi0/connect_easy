import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { ButtonBase } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { useHistory } from 'react-router-dom';
import Logo from './Logo';

const pages = ['Categories'];
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

  const history = useHistory();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleRegisterOnClick = () => {
    history.push('/register');
  };

  const handleLoginOnClick = () => {
    history.push('/login');
  };
  const handleCategoryOnClick = () => {
    history.push('/category');
  };

  const handleLogoOnClick = () => {
    history.push('/');
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <Logo
            name={companyName}
            logoStyle={lgLogoStyle}
            iconStyle={lgLogoIconStyle}
            handleLogoOnClick={handleLogoOnClick}
          />

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
            {/* TODO: AUTH, SEPARATE COMPONENT */}
            <Button sx={{ color: 'white' }} onClick={handleRegisterOnClick}>
              Register
            </Button>
            <Button sx={{ color: 'white' }} onClick={handleLoginOnClick}>
              Login/Logout
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default HomePageAppBar;
