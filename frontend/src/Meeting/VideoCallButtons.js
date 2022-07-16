import React, { useState } from "react";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import MicIcon from "@mui/icons-material/Mic";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import StopScreenShareIcon from "@mui/icons-material/StopScreenShare";
import CallEndIcon from "@mui/icons-material/CallEnd";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import MicOffIcon from "@mui/icons-material/MicOff";
import { Grid, Button } from "@mui/material";



export default function VideoCallButtons({ myStream, handleEndMeeting }) {
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);


  function handleMuteClick() {
    myStream.current
      .getAudioTracks()
      .forEach((track) => (track.enabled = !track.enabled));
    if (isMuted) {
      setIsMuted(false);
    } else {
      setIsMuted(true);
    }
  }

  function handleCameraClick() {
    myStream.current
      .getVideoTracks()
      .forEach((track) => (track.enabled = !track.enabled));
    if (isCameraOff) {
      setIsCameraOff(false);
    } else {
      setIsCameraOff(true);
    }
  }

  function handleScreenShareClick() {
    myStream.current
      .getVideoTracks()
      .forEach((track) => (track.enabled = !track.enabled));
    if (isScreenSharing) {
      setIsScreenSharing(false);
    } else {
      setIsScreenSharing(true);
    }
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
        {isCameraOff ? (
          <VideocamOffIcon style={{ color: "#B53D2D" }} fontSize="large" />
          ) : (
          <VideoCameraFrontIcon style={{ color: "#09995F" }} fontSize="large" />
        )}
      </Button>

      <Button id="mute" onClick={handleMuteClick}>
        {isMuted ? (
          <MicOffIcon style={{ color: "#B53D2D" }} fontSize="large" />
          ) : (
          <MicIcon style={{ color: "#09995F" }} fontSize="large" />
        )}
      </Button>

      <Button id="share" onClick={handleScreenShareClick}>
        {isScreenSharing ? (
          <StopScreenShareIcon style={{ color: "#B53D2D" }} fontSize="large" />
          ) : (
          <ScreenShareIcon style={{ color: "#09995F" }} fontSize="large" />
        )}
      </Button>

      <Button>
        <CallEndIcon
          style={{ color: "#9D00AB" }}
          onClick={handleEndMeeting}
          fontSize="large"
        />
      </Button>
    </Grid>
  );
}
