import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function ConsultantDescription({ description }) {
  return (
    <Typography component="div" variant="body1" color="text.secondary">
      {description || (
        <Box sx={{ fontStyle: "italic" }}>Service description pending</Box>
      )}
    </Typography>
  );
}
