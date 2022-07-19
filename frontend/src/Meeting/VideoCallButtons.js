import React, { useState, useEffect } from "react";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import MicIcon from "@mui/icons-material/Mic";
import CallEndIcon from "@mui/icons-material/CallEnd";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import MicOffIcon from "@mui/icons-material/MicOff";
import { Grid, Button } from "@mui/material";

export default function VideoCallButtons({ myStream, handleEndMeeting }) {
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasCam, setHasCam] = useState(false);
  const [hasMic, setHasMic] = useState(false);

  useEffect(() => {
    // check if user has cam and mic
    navigator.mediaDevices.enumerateDevices().then(function (devices) {
      const hasCam = devices.some(function (d) {
        return d.kind == "videoinput";
      });
      const hasMic = devices.some(function (d) {
        return d.kind == "audioinput";
      });
      setHasCam(hasCam);
      setHasMic(hasMic);
    });
  }, []);

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
      <Button id="camera" onClick={handleCameraClick} disabled={!hasCam}>
        {isCameraOff ? (
          <VideocamOffIcon style={{ color: "#B53D2D" }} fontSize="large" />
        ) : (
          <VideoCameraFrontIcon
            style={{ color: hasCam ? "#09995F" : "grey" }}
            fontSize="large"
          />
        )}
      </Button>

      <Button id="mute" onClick={handleMuteClick} disabled={!hasMic}>
        {isMuted ? (
          <MicOffIcon style={{ color: "#B53D2D" }} fontSize="large" />
        ) : (
          <MicIcon
            style={{ color: hasMic ? "#09995F" : "grey" }}
            fontSize="large"
          />
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
