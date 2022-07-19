import React from "react";
import Typography from "@mui/material/Typography";
import HandshakeIcon from "@mui/icons-material/Handshake";
import { ButtonBase } from "@mui/material";

export default function Logo({
  name,
  logoStyle,
  iconStyle,
  handleLogoOnClick,
}) {
  return (
    <ButtonBase onClick={handleLogoOnClick}>
      <HandshakeIcon sx={iconStyle} />
      <Typography variant="h6" noWrap component="a" sx={logoStyle}>
        {name}
      </Typography>
    </ButtonBase>
  );
}
