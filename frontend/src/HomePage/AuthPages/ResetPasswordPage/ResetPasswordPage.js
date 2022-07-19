import * as React from "react";
import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import HomePageAppBar from "../../HomePageAppBar/HomePageAppBar";
import { ButtonBase } from "@mui/material";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  resetPassword,
  checkTokenForPasswordReset,
} from "../../../store/reducers/authReducer";
import ResetPasswordPageInputs from "./ResetPasswordPageInputs";

const theme = createTheme();

export default function ResetPasswordPage() {
  const { email, token } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.auth);

  const [isFormValid, setIsFormValid] = useState(false);
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  // If we want to create password validation, we can use this:
  const [passwordError, setPasswordError] = useState("");
  useEffect(() => {
    if (password1 !== "") {
      if (password1 === password2) {
        setIsFormValid(true);
      } else {
      }
    } else {
      setIsFormValid(false);
    }
  }, [password1, password2]);

  useEffect(() => {
    dispatch(checkTokenForPasswordReset({ email, token }));

    if (user.isLoggedIn) {
      localStorage.setItem("user", JSON.stringify(user.userDetails));
      history.push("/clientDashboard");
    }
  }, [user.isLoggedIn, dispatch, user.isTokenValid]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userDetails = {
      token,
      password: password1,
    };
    dispatch(resetPassword({ userDetails, history }));
  };

  const handleRegisterOnClick = () => {
    history.push("/register");
  };
  const handleLoginOnClick = () => {
    history.push("/login");
  };

  return (
    <ThemeProvider theme={theme}>
      <HomePageAppBar />
      {user.isTokenValid && (
        <Container component="main">
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Enter a new Password
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }} minWidth="400px">
              <ResetPasswordPageInputs
                password1={password1}
                password2={password2}
                setPassword1={setPassword1}
                setPassword2={setPassword2}
              />

              <Button
                type="submit"
                onClick={handleSubmit}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={!isFormValid}
              >
                Reset Password
              </Button>
              {/* fix the width */}
              <Grid
                container
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Grid item>
                  <ButtonBase onClick={handleLoginOnClick}>
                    <Typography variant="body2" color={"primary.main"}>
                      {"Are you registed? Login"}
                    </Typography>
                  </ButtonBase>
                </Grid>
                <Grid item>
                  <ButtonBase onClick={handleRegisterOnClick}>
                    <Typography variant="body2" color={"primary.main"}>
                      {"Don't have an account? Register"}
                    </Typography>
                  </ButtonBase>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      )}
    </ThemeProvider>
  );
}
