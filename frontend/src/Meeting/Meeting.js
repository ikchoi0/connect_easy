import React, { useCallback } from "react";
import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateAppointmentVideoStartTime } from "../store/reducers/meetingReducer";
import VideoCallButtons from "./VideoCallButtons";
import { Box, Container, Typography, CardMedia, Grid } from "@mui/material";
import {
  postStartMeeting,
  postEndMeeting,
} from "../store/reducers/meetingReducer";
import Chat from "../Chat/Chat";
import { showAlertMessage } from "../store/reducers/alertReducer";

const Meeting = ({ meetingId }) => {
  const dispatch = useDispatch();

  const socket = io("http://localhost:5002");
  // const socket = io("https://connect-easy-rid.herokuapp.com");
  // const [videoRef, setVideoRef] = useState(null);
  // const [peerVideoRef, setPeerVideoRef] = useState(null);
  const history = useHistory();
  const peerVideoRef = useRef(null);
  const videoRef = useRef(null);
  const myStream = useRef(null);
  const peerConnectionRef = useRef(null);
  let connectionMade = false;
  const init = useCallback(async () => {
    peerConnectionRef.current = new RTCPeerConnection({
      iceServers: [
        {
          urls: [
            "stun:stun.l.google.com:19302",
            "stun:stun1.l.google.com:19302",
            "stun:stun2.l.google.com:19302",
            "stun:stun3.l.google.com:19302",
            "stun:stun4.l.google.com:19302",
          ],
        },
      ],
    });

    myStream.current = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    if (videoRef.current) {
      videoRef.current.srcObject = myStream.current;
    }

    myStream.current.getTracks().forEach((track) => {
      if (peerConnectionRef.current) {
        peerConnectionRef.current.addTrack(track, myStream.current);
      }
    });

    peerConnectionRef.current.ontrack = (event) => {
      peerVideoRef.current.srcObject = event.streams[0];
    };

    peerConnectionRef.current.addEventListener("icecandidate", handleIce);
    peerConnectionRef.current.addEventListener("addstream", handleAddStream);

    peerConnectionRef.current.oniceconnectionstatechange = () => {
      console.log(
        "ICE state changed to ",
        peerConnectionRef.current.iceConnectionState
      );
    };

    socket.emit("join_room", meetingId);
  }, [history, meetingId]);

  const handleEndMeeting = () => {
    if (connectionMade) {
      // add router to show alert before redirecting to dashboard
      alert("End meeting");
      localStorage.removeItem("activeMeeting");
      dispatch(postEndMeeting(meetingId));
      socket.emit("meeting_ended");
      window.location.replace("/dashboard");
    } else {
      dispatch(showAlertMessage("You must be connected to end meeting"));
    }
  };

  useEffect(() => {
    socket.on("welcome", async () => {
      try {
        // console.log("Sending offer");
        const offer = await peerConnectionRef.current.createOffer({
          iceRestart: true,
        });

        await peerConnectionRef.current?.setLocalDescription(offer);
        socket.emit("offer", offer, meetingId);
      } catch (error) {
        console.log(error);
      }
    });

    socket.on("offer", async (offer) => {
      try {
        await peerConnectionRef.current.setRemoteDescription(offer);

        const answer = await peerConnectionRef.current.createAnswer();

        // console.log("Received offer");
        await peerConnectionRef.current?.setLocalDescription(answer);

        // console.log("Sending answer");
        socket.emit("answer", answer, meetingId);
      } catch (error) {
        console.log(error);
      }
    });

    socket.on("answer", async (answer) => {
      try {
        await peerConnectionRef.current.setRemoteDescription(answer);
      } catch (error) {
        console.log(error);
      }
    });

    socket.on("ice", async (ice) => {
      try {
        if (ice) {
          const userId = JSON.parse(localStorage.getItem("user")).userId;
          const activeMeeting = JSON.parse(
            localStorage.getItem("activeMeeting")
          );
          connectionMade = true;

          // update video start time here
          // if there is no active meeting, then update the start time
          if (!activeMeeting) {
            dispatch(
              postStartMeeting({
                appointmentData: {
                  appointmentId: meetingId,
                  userId: userId,
                },
                history,
              })
            );
          }

          console.log("connected !!");
        }
        await peerConnectionRef.current.addIceCandidate(ice);
      } catch (error) {
        console.log(error);
      }
    });
    socket.on("peer_left", async (ice) => {
      // console.log("Peer left, closing connection");
      peerConnectionRef?.close();
      peerConnectionRef = new RTCPeerConnection({
        iceServers: [
          {
            urls: [
              "stun:stun.l.google.com:19302",
              "stun:stun1.l.google.com:19302",
              "stun:stun2.l.google.com:19302",
              "stun:stun3.l.google.com:19302",
              "stun:stun4.l.google.com:19302",
            ],
          },
        ],
      });
      peerConnectionRef.current.addEventListener("icecandidate", handleIce);
      peerConnectionRef.current.addEventListener("addstream", handleAddStream);
      init();
    });

    init();

    socket.on("meeting_ended", async () => {
      // add router to show alert before redirecting to dashboard
      alert("Meeting ended");
      localStorage.removeItem("activeMeeting");
      window.location.replace("/dashboard");
    });

    return () => {
      myStream.current?.getTracks().forEach((track) => track.stop());
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
      socket.close();
      socket.removeAllListeners();
      if (!connectionMade) {
        localStorage.removeItem("activeMeeting");
      }
    };
  }, [meetingId, init]);

  function handleIce(data) {
    socket.emit("ice", data.candidate, meetingId);
  }

  function handleAddStream(data) {
    peerVideoRef.current.srcObject = data.stream;
  }

  return (
    <>
      <Container
        maxWidth="lg"
        color="primary.main"
        sx={{
          maxHeight: "700px",
        }}
        display="flex"
      >
        <Grid container spacing={2} sx={{}}>
          <Grid item md={8} sx={{ padding: 0 }}>
            {/* 🎃 VIDEO 1 */}
            <CardMedia
              component="video"
              ref={videoRef}
              autoPlay
              playsInline
              width={"100%"}
              height={"100%"}
            ></CardMedia>
          </Grid>
          <Grid
            item
            md={4}
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "700px",
            }}
          >
            {/* 🎃 MEETING DETAILS */}
            <Box
              sx={{
                // height: "20%",
                backgroundColor: "yellow",
              }}
            >
              <Typography>Client: John Doe</Typography>
              <Typography>Consultant: Jane Smith</Typography>
              <Typography>Time elapsed</Typography>
              <Typography>Description:</Typography>
            </Box>
            {/* 🎃 CHAT GOES HERE */}
            <Chat socket={socket} />
          </Grid>

          {/* 🎃 BUTTONS */}
          <VideoCallButtons
            myStream={myStream}
            handleEndMeeting={handleEndMeeting}
          />

          {/* 🎃 VIDEO 2 */}
          <Grid item md={4}>
            <CardMedia
              component="video"
              ref={peerVideoRef}
              autoPlay
              playsInline
              width={"300px"}
              height={"300px"}
            ></CardMedia>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Meeting;
