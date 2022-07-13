import * as React from "react";
import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import HomePageAppBar from "../../HomePageAppBar/HomePageAppBar";
import { ButtonBase } from "@mui/material";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../../store/reducers/authReducer";
import ResetPasswordPageInputs from "./ResetPasswordPageInputs";
const theme = createTheme();

export default function ResetPasswordPage() {
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();

  const [email, setEmail] = useState("");

  useEffect(() => {
    if (user.isLoggedIn) {
      localStorage.setItem("user", JSON.stringify(user.userDetails));
      history.push("/clientDashboard");
    }
  }, [user.isLoggedIn]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userDetails = {
      email,
    };
    dispatch(resetPassword({ userDetails, history }));
  };

  const handleRegisterOnClick = () => {
    history.push("/register");
  };

  return (
    <ThemeProvider theme={theme}>
      <HomePageAppBar />
      <Container component="main">
        <CssBaseline />
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
            Reset Password
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <ResetPasswordPageInputs email={email} setEmail={setEmail} />

            <Button
              type="submit"
              onClick={(e) => handleSubmit(e)}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Reset Password
            </Button>
            {/* fix the width */}
            <Grid container minWidth={"400px"}>
              <Grid item xs>
                <Link href="/login" variant="body2">
                  Already registered?
                </Link>
              </Grid>
              <Grid item>
                <ButtonBase onClick={handleRegisterOnClick}>
                  <Typography variant="body2" color={"primary.main"}>
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
