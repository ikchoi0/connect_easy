import * as React from "react";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import { Card, Container } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import Stack from "@mui/material/Stack";
import TextFieldWithLabel from "../shared/components/TextFieldWithLabel";
export default function Content() {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(
    new Date(new Date().getTime() + 30 * 60 * 1000)
  );
  const handleDateChange = (newValue) => {
    setDate(newValue);
  };
  const handleStartTimeChange = (newValue) => {
    setStartTime(newValue);
  };
  const handleEndTimeChange = (newValue) => {
    setEndTime(newValue);
  };

  const handleCreateButton = () => {
    let card = {
      date: date.toString(),
      startTime: startTime.toString(),
      endTime: endTime.toString(),
      description,
    };
    console.log(card);
  };

  return (
    <Container sx={{ py: 8 }} maxWidth="md">
      {/* End hero unit */}
      <Card sx={{ margin: 2, overflow: "hidden" }}>
        <Stack spacing={3}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Button
              variant="contained"
              sx={{ mr: 1 }}
              onClick={() => handleCreateButton()}
            >
              Create New Appointment
            </Button>
            <TextFieldWithLabel
              id="description"
              label="Description"
              autoFocus={true}
              value={description}
              setValue={setDescription}
            />
            <DesktopDatePicker
              label="Appointment Date"
              inputFormat="MM/dd/yyyy"
              value={date}
              onChange={() => handleDateChange(date)}
              renderInput={(params) => <TextField {...params} />}
            />
            <TimePicker
              label="Start Time"
              value={startTime}
              onChange={handleStartTimeChange}
              renderInput={(params) => <TextField {...params} />}
            />
            <TimePicker
              label="End Time"
              value={endTime}
              onChange={handleEndTimeChange}
              renderInput={(params) => <TextField {...params} />}
            />{" "}
          </LocalizationProvider>
        </Stack>
      </Card>
      {/* Map cards below using consultant appointment data */}
      <Card sx={{ margin: 2 }}>
        <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="center">
          consultant schedule
        </Typography>
      </Card>
      <Card sx={{ margin: 2 }}>
        <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="center">
          consultant schedule
        </Typography>
      </Card>{" "}
      <Card sx={{ margin: 2 }}>
        <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="center">
          consultant schedule
        </Typography>
      </Card>{" "}
      <Card sx={{ margin: 2 }}>
        <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="center">
          consultant schedule
        </Typography>
      </Card>
    </Container>
  );
}
