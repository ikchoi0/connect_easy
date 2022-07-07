import * as React from 'react';
import { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import HomePageAppBar from '../../HomePageAppBar/HomePageAppBar';
import { ButtonBase } from '@mui/material';
import { useHistory } from 'react-router-dom';
import LoginPageInputs from './LoginPageInputs';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../store/reducers/authReducer';

const theme = createTheme();

export default function Login() {
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (user.isLoggedIn) {
      localStorage.setItem('user', JSON.stringify(user.userDetails));
      history.push('/dashboard');
    }
  }, [user.isLoggedIn]);

  const handleSubmit = () => {
    const userDetails = {
      email,
      password,
    };
    dispatch(login({ userDetails, history }));
  };

  const handleRegisterOnClick = () => {
    history.push('/register');
  };

  return (
    <ThemeProvider theme={theme}>
      {email}
      {password}
      <HomePageAppBar />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <LoginPageInputs
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              onClick={(e) => handleSubmit(e)}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <ButtonBase onClick={handleRegisterOnClick}>
                  <Typography variant="body2" color={'primary.main'}>
                    {"Don't have an account? Register here"}
                  </Typography>
                </ButtonBase>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
