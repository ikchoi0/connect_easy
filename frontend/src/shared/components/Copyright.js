import React from "react";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";

const Copyright = () => {
  return (
    <Box>
      <Typography
        variant="body2"
        align="center"
        color="text.secondary"
        component="p"
      >
        All rights reserved.
      </Typography>

      <Typography variant="body2" color="text.secondary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="  /">
          Connect Easy
        </Link>{" "}
        {new Date().getFullYear()}.
      </Typography>
    </Box>
  );
};

export default Copyright;
