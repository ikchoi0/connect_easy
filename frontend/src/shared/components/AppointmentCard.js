import React from "react";
import { Box, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import moment from "moment";

const AppointmentCard = ({
  id,
  date,
  startTime,
  endTime,
  description,
  onDelete,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        border: "1px solid #ccc",
        borderRadius: "5px",
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <Typography
          sx={{ my: 5, mx: 2 }}
          color="text.primary"
          align="left"
          variant="body1"
          width={"50%"}
        >
          {description}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-evenly",
          flexGrow: 1,
        }}
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
          sx={{ flexGrow: 1 }}
          variant="contained"
          color="secondary"
          size="large"
          onClick={() => onDelete(id)}
        >
          Delete
        </Button>
      </Box>
    </Box>
  );
};

export default AppointmentCard;
