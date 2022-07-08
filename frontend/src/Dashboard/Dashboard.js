import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Navigator from './Navigator';
import Availability from './Availability';
import Header from './Header';
import Scheduler from '../Scheduler/Scheduler';
import { useDispatch, useSelector } from 'react-redux';
import { theme } from './theme';
import Copyright from '../shared/components/Copyright';
import { logout } from '../shared/utils/auth';
import { setUser } from '../store/reducers/authReducer';
const drawerWidth = 256;

export default function Dashboard() {
  const { selectedNavigatorItem } = useSelector((state) => state.dashboard);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));

  const dispatch = useDispatch();

  React.useEffect(() => {
    const userDetails = localStorage.getItem('user');

    if (!userDetails) {
      logout();
    } else {
      dispatch(setUser(JSON.parse(userDetails)));
    }
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <CssBaseline />
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
          {isSmUp ? null : (
            <Navigator
              PaperProps={{ style: { width: drawerWidth } }}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
            />
          )}

          <Navigator
            PaperProps={{ style: { width: drawerWidth } }}
            sx={{ display: { sm: 'block', xs: 'none' } }}
          />
        </Box>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Header onDrawerToggle={handleDrawerToggle} />
          <Box
            component="main"
            sx={{ flex: 1, py: 6, px: 4, bgcolor: '#eaeff1' }}
          >
            {selectedNavigatorItem === 'Home' && <>Home</>}
            {selectedNavigatorItem === 'Availability' && <Availability />}
            {selectedNavigatorItem === 'Calendar' && <Scheduler />}
            {selectedNavigatorItem === 'Payments' && <>payments</>}
          </Box>
          <Box component="footer" sx={{ p: 2, bgcolor: '#eaeff1' }}>
            <Copyright />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
