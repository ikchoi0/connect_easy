import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

function ConfirmModal({
  onConfirm,
  timeSlot,
  selectedDate,
  consultantInfo,
  onCancel,
  message,
}) {
  return (
    <Container
      sx={{
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        gap: "2rem",
      }}
    >
      <CheckCircleIcon color="success" sx={{ width: "40px", height: "40px" }} />
      {timeSlot && selectedDate && consultantInfo && (
        <>
          <Typography variant="h3">
            Confirm your appointment with {consultantInfo.consultant}
          </Typography>

          <Box
            sx={{
              width: "70%",
              height: "200px",
              border: "1px solid black",
              borderRadius: "1rem",
            }}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Box
              sx={{
                display: "flex",
                gap: "1rem",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CalendarMonthIcon />
              <Typography variant="h5">
                {selectedDate && selectedDate}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: "1rem",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AccessTimeIcon />
              <Typography variant="h5">{timeSlot}</Typography>
            </Box>
          </Box>
        </>
      )}
      {{ message } && <Typography variant="h3">{message}</Typography>}
      <Box
        sx={{ display: "flex", justifyContent: "space-between", gap: "1.5rem" }}
      >
        <Button variant="contained" color="error" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={onConfirm}>
          Confirm
        </Button>
      </Box>
    </Container>
  );
}

export default ConfirmModal;
