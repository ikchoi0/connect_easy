import * as React from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import HomePageAppBar from "../../HomePageAppBar/HomePageAppBar";
import { useHistory } from "react-router-dom";
import { ButtonBase } from "@mui/material";
import RegisterPageInputs from "./RegisterPageInputs";
const theme = createTheme();

export default function RegisterPage() {
  const history = useHistory();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [consultantCheck, setConsultantCheck] = useState(false);

  const handleSubmit = (event) => {
    // TODO: dispatch(register)
  };

  const handleSignInOnClick = () => {
    history.push("/login");
  };

  return (
    <ThemeProvider theme={theme}>
      <HomePageAppBar />
      <Container component="main" maxWidth="xs">
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
            Register
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <RegisterPageInputs
              firstName={firstName}
              setFirstName={setFirstName}
              lastName={lastName}
              setLastName={setLastName}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              consultantCheck={consultantCheck}
              setConsultantCheck={setConsultantCheck}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <ButtonBase onClick={handleSignInOnClick}>
                  <Typography variant="body2" color={"primary.main"}>
                    Already have an account? Login here
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
