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
  email,
  startTime,
  endTime,
  description = "Unbooked",
  onDelete,
  buttonLabel,
  handleCardButton,
  appointmentBooked,
  children,
}) => {
  let title = "Meeting with: ";
  let name = "";
  let body = "";
  let clientEmailString = "";
  let consultantEmailString = "";
  let inquiry = "Inquiry: ";
 
  if (appointmentBooked) {
    inquiry = inquiry;
    body = description;
    if (role === "consultant") {
      name = clientName;
      clientEmailString = "Client's email: ";
      email = email;
    } else if (role === "client") {
      name = consultantName;
      consultantEmailString = "Consultant's email: ";
      email = email;
    }
  } else {
    title = "Unbooked";
    email = "";
    name = "";
    inquiry = "";
  }

  const styles = appointmentBooked
    ? { backgroundColor: "#fafafa" }
    : { backgroundColor: "#dbdbdb" };

  const unbooked = (
    <>
      <Typography
        sx={{
          my: 5,
          wordWrap: "break-word",
          width: "300px",

        }}
        color="text.primary"
        align="left"
        justifyContent="center"
        variant="body1"
        maxWidth={"300px"}
        flexWrap
        fontWeight="bold"
      >
        Unbooked
      </Typography>
    </>
  );
  const bodyContent = <>
  <Typography
          sx={{
            my: 5,
            wordWrap: "break-word",
            width: "300px",
            mr: "5px",
            mt: "15px",
            mb: "2px",
          }}
          color="text.primary"
          align="left"
          justifyContent="center"
          variant="body1"
          maxWidth={"300px"}
          flexWrap
          fontWeight="bold"
        >
          {title}
        </Typography>
        <Typography
          sx={{
            my: 5,
            wordWrap: "break-word",
            width: "300px",
            mr: "5px",
            mt: "2px",
            mb: "15px",
          }}
          color="text.primary"
          align="left"
          variant="body1"
          maxWidth={"300px"}
          flexWrap
        >
          {name}
        </Typography>
        <Typography
          sx={{
            my: 5,
            wordWrap: "break-word",
            width: "300px",
            mr: "5px",
            mt: "2px",
            mb: "2px",
          }}
          color="text.primary"
          align="left"
          variant="body1"
          maxWidth={"300px"}
          flexWrap
          fontWeight="bold"
        >
          {inquiry}
        </Typography>
        <Typography
          sx={{
            my: 5,
            wordWrap: "break-word",
            width: "300px",
            mr: "5px",
            mt: "2px",
            mb: "15px",
          }}
          color="text.primary"
          align="left"
          variant="body1"
          maxWidth={"300px"}
          flexWrap
        >
          {body}
        </Typography>
        <Typography
          sx={{
            my: 5,
            wordWrap: "break-word",
            width: "300px",
            mr: "5px",
            mt: "2px",
            mb: "2px",
          }}
          color="text.primary"
          align="left"
          variant="body1"
          maxWidth={"300px"}
          flexWrap
          fontWeight="bold"
        >
          {clientEmailString || consultantEmailString}
        </Typography>
        <Typography
          sx={{
            my: 5,
            wordWrap: "break-word",
            width: "300px",
            mr: "5px",
            mt: "2px",
            mb: "15px",
          }}
          color="text.primary"
          align="left"
          variant="body1"
          maxWidth={"300px"}
          flexWrap
        >
          {email}
        </Typography>
        </>

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        border: "3px solid #ccc",
        borderRadius: "5px",
        marginY: "15px",
        maxWidth: "100%",
        ...styles,
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
          alignContent: "space-center",
          justifyContent: "center",
          marginLeft: "20px",
        }}
        minHeight="100px"
      >
        {appointmentBooked ? bodyContent : unbooked}
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
          disabled={role === "consultant" && appointmentBooked}
        >
          {buttonLabel}
        </Button>
        {children}
      </Box>
    </Box>
  );
};

export default AppointmentCard;
