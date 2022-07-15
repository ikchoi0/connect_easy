import React from "react";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import MicIcon from "@mui/icons-material/Mic";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import CallEndIcon from "@mui/icons-material/CallEnd";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import MicOffIcon from "@mui/icons-material/MicOff";
import { Grid, Button } from "@mui/material";
import { postEndMeeting } from "../store/reducers/meetingReducer";

let muted = false;
let cameraOff = false;
let muteBtn = "mute";
let cameraBtn = "camera";

export default function VideoCallButtons({ myStream, handleEndMeeting }) {
  function handleMuteClick() {
    myStream.current
      .getAudioTracks()
      .forEach((track) => (track.enabled = !track.enabled));
    if (!muted) {
      muteBtn = "Unmute";
      muted = true;
      console.log("muted:", muted);
    } else {
      muteBtn = "Mute";
      muted = false;
      console.log("muted:", muted);
    }
    console.log("mute button:", muteBtn);
  }

  function handleCameraClick() {
    myStream.current
      .getVideoTracks()
      .forEach((track) => (track.enabled = !track.enabled));
    if (cameraOff) {
      cameraBtn = "Off";
      cameraOff = false;
    } else {
      cameraBtn = "On";
      cameraOff = true;
    }
    console.log("camera button:", cameraBtn);
  }

  return (
    <Grid
      item
      md={8}
      sx={{
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
      }}
    >
      <Button id="camera" onClick={handleCameraClick}>
        {cameraBtn} 
        <VideoCameraFrontIcon color="primary" fontSize="large" />
        <VideocamOffIcon color="primary" fontSize="large" />
      </Button>

      <Button id="mute" onClick={handleMuteClick}>
        <MicIcon color="primary" fontSize="large" />
        <MicOffIcon color="primary" fontSize="large" />
      </Button>

      <Button>
        <ScreenShareIcon color="primary" fontSize="large" />
      </Button>

      <Button>
        <CallEndIcon
          color="error"
          onClick={handleEndMeeting}
          fontSize="large"
        />
      </Button>
    </Grid>
  );
}
