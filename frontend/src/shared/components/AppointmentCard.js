import React from "react";
import { Box, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import moment from "moment";

const AppointmentCard = ({
  role,
  clientName,
  consultantName,
  id,
  date,
  startTime,
  endTime,
  description = "Unbooked",
  onDelete,
  buttonLabel,
  handleCardButton,
  appointmentBooked,
  children,
}) => {
  // status
  // title
  // body
  let title = "Meeting with: ";
  let body = "";

  if (appointmentBooked) {
    body = description;
    if (role === "consultant") {
      title += clientName;
    } else if (role === "client") {
      title = consultantName;
    }
  } else {
    title = "UNBOOKED";
  }

  const styles = appointmentBooked
    ? { backgroundColor: "#fafafa" }
    : { backgroundColor: "#dbdbdb" };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        border: "3px solid #ccc",
        borderRadius: "5px",
        marginY: "10px",
        ...styles,
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <Typography
          sx={{
            my: 5,
            wordWrap: "break-word",
            width: "250px",
            mr: "5px",
            ml: "15px",
          }}
          color="text.primary"
          align="left"
          variant="body1"
          maxWidth={"500px"}
          flexWrap
        >
          {title}
        </Typography>
        <Typography
          sx={{
            my: 5,
            wordWrap: "break-word",
            width: "300px",
            mr: "5px",
            ml: "15px",
          }}
          color="text.primary"
          align="left"
          variant="body1"
          maxWidth={"300px"}
          flexWrap
        >
          {body}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "250px",
          ml: "5px",
          mr: "5px",
        }}
        maxWidth={"250px"}
        align="left"
      >
        <Typography variant="subtitle1">
          Date: {moment(date).format("YYYY-MM-DD")}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography color="text.secondary" align="center">
            {startTime}
          </Typography>
          <Typography sx={{ marginX: 1 }} align="center">
            -
          </Typography>
          <Typography color="text.secondary" align="center">
            {endTime}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ flexGrow: 1 }}>
        <Button
          sx={{
            ml: "5px",
            mr: "5px",
            flexGrow: 1,
          }}
          variant="contained"
          color="primary"
          size="large"
          onClick={() => handleCardButton(id)}
          disabled={appointmentBooked}
        >
          {buttonLabel}
        </Button>
        {children}
      </Box>
    </Box>
  );
};

export default AppointmentCard;
