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
  clientEmail,
  consultantEmail,
  startTime,
  endTime,
  description = "Unbooked",
  onDelete,
  buttonLabel,
  handleCardButton,
  appointmentBooked,
  children,
  unbookedString = "Unbooked",
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
      email = clientEmail;
    } else if (role === "client") {
      name = consultantName;
      consultantEmailString = "Consultant's email: ";
      email = consultantEmail;
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

  const typographyStyle = {
    mb: 5,
    wordWrap: "break-word",
    width: "300px",
    mr: "5px",
  };
  const typographyProps = {
    color: "text.primary",
    align: "left",
    variant: "body1",
  };

  const unbooked = (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "baseline",
        }}
      >
        <Typography variant="subtitle1">
          {moment(date).format("MMM Do, YYYY")} &nbsp;
        </Typography>
        <Typography color="text.secondary" align="center">
          {startTime}
        </Typography>
        <Typography sx={{ marginX: 1 }} align="center">
          -
        </Typography>
        <Typography color="text.secondary" align="center">
          {endTime}
        </Typography>

        <Typography
          sx={{
            my: 5,
            wordWrap: "break-word",
            width: "300px",
          }}
          {...typographyProps}
          fontWeight="bold"
        >
          &nbsp; &nbsp;{unbookedString}
        </Typography>
        <Button
          variant="contained"
          color="error"
          size="large"
          onClick={() => handleCardButton(id)}
        >
          {buttonLabel}
        </Button>
      </Box>
    </>
  );

  const newBodyContent = (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Box>
          <Typography {...typographyProps} fontWeight="bold">
            {name}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography variant="subtitle1">
              {moment(date).format("MMM Do, YYYY")} &nbsp;
            </Typography>
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
          <Typography {...typographyProps}>{email}</Typography>
        </Box>
        <Box sx={{ display: "flex" }}>
          {children}
          {role !== "consultant" && (
            <Box sx={{ ml: "8px" }}>
              <Button
                variant="contained"
                color="error"
                size="large"
                onClick={() => handleCardButton(id)}
              >
                {buttonLabel}
              </Button>
            </Box>
          )}
        </Box>
      </Box>
      <Box
        component="div"
        whiteSpace="normal"
        sx={{ display: "flex", mt: "16px" }}
      >
        <Typography {...typographyProps} fontWeight="bold">
          {inquiry} &nbsp;
        </Typography>
        <Typography
          textOverflow={"ellipsis"}
     
          // noWrap
          sx={{
            width: "350px",
            wordWrap: "break-word",
            textOverflow: "ellipsis",
          }}
        >
          
          {body}
        </Typography>
      </Box>
    </>
  );
  const bodyContent = (
    <>
      <Typography
        sx={{
          ...typographyStyle,
          mt: "15px",
          mb: "2px",
        }}
        {...typographyProps}
        fontWeight="bold"
      >
        {title}
      </Typography>
      <Typography
        sx={{
          ...typographyStyle,
          mt: "2px",
          mb: "15px",
        }}
        {...typographyProps}
      >
        {name}
      </Typography>
      <Typography
        sx={{
          ...typographyStyle,
          mt: "2px",
          mb: "2px",
        }}
        {...typographyProps}
        fontWeight="bold"
      >
        {inquiry}
      </Typography>
      <Typography
        sx={{
          ...typographyStyle,
          mt: "2px",
          mb: "15px",
        }}
        {...typographyProps}
      >
        {body}
      </Typography>
      <Typography
        sx={{
          ...typographyStyle,
          mt: "2px",
          mb: "2px",
        }}
        {...typographyProps}
        fontWeight="bold"
      >
        {clientEmailString || consultantEmailString}
      </Typography>
      <Typography
        sx={{
          ...typographyStyle,
          mt: "2px",
          mb: "15px",
        }}
        {...typographyProps}
      >
        {email}
      </Typography>
    </>
  );

  return (
    <Box
      sx={{
        borderBottom: "3px solid #ccc",
        marginY: "15px",
        maxWidth: "100%",
        px: "16px",
        py: "8px",
        ...styles,
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
          justifyContent: "center",
        }}
        minHeight="100px"
      >
        {appointmentBooked ? newBodyContent : unbooked}
        {/* <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Typography variant="subtitle1">
            {moment(date).format('MMM Do, YYYY')} &nbsp;
          </Typography>
          <Typography color="text.secondary" align="center">
            {startTime}
          </Typography>
          <Typography sx={{ marginX: 1 }} align="center">
            -
          </Typography>
          <Typography color="text.secondary" align="center">
            {endTime}
          </Typography>
        </Box> */}
      </Box>

      {/* <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '250px',
          ml: '5px',
          mr: '5px',
        }}
        maxWidth={'250px'}
        align="left"
      ></Box> */}

      {/* <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => handleCardButton(id)}
          disabled={role === 'consultant' && appointmentBooked}
        >
          {buttonLabel}
        </Button>
        {children}
      </Box> */}
    </Box>
  );
};

export default AppointmentCard;
