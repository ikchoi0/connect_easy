import React from "react";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import MicIcon from "@mui/icons-material/Mic";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import CallEndIcon from "@mui/icons-material/CallEnd";
import { Grid, Button } from "@mui/material";

export default function VideoCallButtons({

}) {
  return (
    <Grid
      item
      md={8}
      sx={{
        backgroundColor: "white",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
      }}
    >
      <Button>
        <VideoCameraFrontIcon color="primary" fontSize="large" />
      </Button>
      <Button>
        <MicIcon color="primary" fontSize="large" />
      </Button>
      <Button>
        <ScreenShareIcon color="primary" fontSize="large" />
      </Button>
      <Button>
        <CallEndIcon color="error" fontSize="large" />
      </Button>
    </Grid>
  );
}
