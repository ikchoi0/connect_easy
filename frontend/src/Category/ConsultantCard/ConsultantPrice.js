import React from "react";
import Typography from "@mui/material/Typography";

export default function ConsultantPrice({ price }) {
  return (
    <Typography variant="body2" color="text.secondary" component="div">
      Price per hour: ${price}
    </Typography>
  );
}
