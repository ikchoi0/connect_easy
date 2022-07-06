import React from 'react';
import Typography from '@mui/material/Typography';
import HandshakeIcon from '@mui/icons-material/Handshake';

export default function Logo({ name, logoStyle, iconStyle }) {
  return (
    <>
      <HandshakeIcon sx={iconStyle} />
      <Typography variant="h6" noWrap component="a" sx={logoStyle}>
        {name}
      </Typography>
    </>
  );
}
