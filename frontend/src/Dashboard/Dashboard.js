import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Navigator from './Navigator';
import Availability from './Availability';
import Header from './Header';
import Scheduler from '../Scheduler/Scheduler';
import { useDispatch, useSelector } from 'react-redux';
import { theme } from '../shared/styles/theme';
import Copyright from '../shared/components/Copyright';
import { logout } from '../shared/utils/auth';
import { setUser } from '../store/reducers/authReducer';
import { useHistory } from 'react-router-dom';
import { handleAuth } from '../shared/utils/auth';
import Home from './Home';
const drawerWidth = 300;

export default function Dashboard(d) {
  handleAuth();
  const history = useHistory();
  const { selectedNavigatorItem } = useSelector((state) => state.dashboard);
  const userDetails = JSON.parse(localStorage.getItem('user'));
  if (userDetails.role !== 'consultant') {
    history.push('/clientDashboard');
  }
  const dispatch = useDispatch();

  React.useEffect(() => {
    const userDetails = localStorage.getItem('user');
    if (userDetails.role !== 'consultant') {
      history.push('/clientDashboard');
    }
    if (!userDetails) {
      logout();
    } else {
      dispatch(setUser(JSON.parse(userDetails)));
    }
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <CssBaseline />
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
          <Navigator
            PaperProps={{ style: { width: drawerWidth } }}
            sx={{ display: { sm: 'block', xs: 'none' } }}
          />
        </Box>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Header />
          <Box
            component="main"
            sx={{ flex: 1, py: 6, px: 4, bgcolor: '#eaeff1' }}
          >
            {selectedNavigatorItem === 'Home' && <Home />}
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
