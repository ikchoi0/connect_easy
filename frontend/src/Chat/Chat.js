import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { FormControl, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { Button, TextField } from "@mui/material";
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  minHeight: "px",
  lineHeight: "60px",
}));
const messages = [
  { id: 1, message: "Hello" },
  { id: 2, message: "World this something soitjhjkd" },
  { id: 3, message: "!21321xfbvvvcvc" },
  { id: 4, message: "sada sdwdas sdsd!" },
  { id: 5, message: "asdasada 23232s ddf!" },
  { id: 6, message: "asdasada 23232s ddf!" },
  { id: 7, message: "asdasada 23232s ddf!" },
  { id: 8, message: "asdasada 23232s ddf!" },
  { id: 9, message: "asdasada 23232s ddf!" },
  { id: 10, message: "asdasada 23232s ddf!" },
  { id: 11, message: "asdasada 23232s ddf!" },
  { id: 12, message: "asdasada 23232s ddf!" },
];
const lightTheme = createTheme({ palette: { mode: "light" } });

export default function Elevation() {
  const [values, setValues] = React.useState({
    name: "Marko",
  });
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Box
          sx={{
            bgcolor: "background.default",
            display: "grid",
            gap: 2,
            width: "500px",
          }}
        >
          {messages.map((message) => (
            <Box
              sx={{
                textAlignLast: message.id % 2 === 0 ? "right" : "left",
                width: "100%",
              }}
            >
              <Item align key={message} elevation={4} sx={{ paddingX: "10px" }}>
                <PersonIcon /> {message.id % 2 === 0 ? "Me" : "You"}
                <Typography sx={{ wordWrap: "break-word" }}>
                  {message.message}
                </Typography>
              </Item>
            </Box>
          ))}
          <FormControl noValidate autoComplete="off" fullWidth>
            <div style={{ display: "flex" }}>
              <TextField
                id="standard-name"
                label="Name"
                value={values.name}
                onChange={handleChange("name")}
                margin="normal"
              />
            </div>
          </FormControl>
        </Box>
      </Grid>
    </Grid>
  );
}
