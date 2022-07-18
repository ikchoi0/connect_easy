import React from "react";
import Typography from "@mui/material/Typography";


const ConsultantName = ({ firstName, lastName}) => {
  return (
    <Typography
      component="span"
      variant="h6"
      color="#36454F"
      sx={{ width: 250 }}
    >
      {firstName} {lastName}
    </Typography>
  );
}

export default ConsultantName


