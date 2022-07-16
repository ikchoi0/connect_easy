<<<<<<< HEAD
import React, { useCallback, useState } from "react";
import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import VideoCallButtons from "./VideoCallButtons";
import { Box, Container, Typography, CardMedia, Grid } from "@mui/material";
import {
  postStartMeeting,
  postEndMeeting,
} from "../store/reducers/meetingReducer";
import Chat from "../Chat/Chat";
import { showAlertMessage } from "../store/reducers/alertReducer";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import MeetingInfo from "./MeetingInfo";
const Meeting = ({ meetingId, socket }) => {
  const dispatch = useDispatch();
  // const socket = io("http://localhost:5002");
  // const socket = io("https://connect-easy-rid.herokuapp.com");
  // const [videoRef, setVideoRef] = useState(null);
  // const [peerVideoRef, setPeerVideoRef] = useState(null);
  const [display, setDisplay] = useState("none");
=======
import React, { useCallback } from 'react';
import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getAppointmentByAppointmentId } from '../store/reducers/meetingReducer';
import VideoCallButtons from './VideoCallButtons';
import { Box, Container, Typography, CardMedia, Grid } from '@mui/material';
import {
  postStartMeeting,
  postEndMeeting,
} from '../store/reducers/meetingReducer';
import Chat from '../Chat/Chat';
import { showAlertMessage } from '../store/reducers/alertReducer';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import TimelapseIcon from '@mui/icons-material/Timelapse';

import MeetingInfo from './MeetingInfo';
const Meeting = ({ meetingId }) => {
  const dispatch = useDispatch();

  const { appointmentData } = useSelector((state) => state.meeting);

  const socket = io('http://localhost:5002');
  // const socket = io("https://connect-easy-rid.herokuapp.com");

>>>>>>> 07cc31fdfa8d116cfdadda061facb9964fee1d0d
  const history = useHistory();
  const peerVideoRef = useRef(null);
  const videoRef = useRef(null);
  const myStream = useRef(null);
  const peerConnectionRef = useRef(null);
<<<<<<< HEAD
  let meetingEnded = false;
=======

>>>>>>> 07cc31fdfa8d116cfdadda061facb9964fee1d0d
  let connectionMade = false;
  let peer_left;
  const init = useCallback(async () => {
    peerConnectionRef.current = new RTCPeerConnection({
      iceServers: [
        {
          urls: [
            'stun:stun.l.google.com:19302',
            'stun:stun1.l.google.com:19302',
            'stun:stun2.l.google.com:19302',
            'stun:stun3.l.google.com:19302',
            'stun:stun4.l.google.com:19302',
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
      if (peerVideoRef.current.srcObject) {
        peerVideoRef.current.srcObject = event.streams[0];
      } else {
      }
    };

    peerConnectionRef.current.addEventListener('icecandidate', handleIce);
    peerConnectionRef.current.addEventListener('addstream', handleAddStream);

    peerConnectionRef.current.oniceconnectionstatechange = () => {
      if (peerConnectionRef.current.iceConnectionState === "disconnected") {
        setDisplay("none");
      } else {
        setDisplay("block");
      }
      console.log(
        'ICE state changed to ',
        peerConnectionRef.current.iceConnectionState
      );
    };

    socket.emit('join_room', meetingId);
  }, [history, meetingId]);

  const handleEndMeeting = () => {
    // if (connectionMade) {
    // add router to show alert before redirecting to dashboard
<<<<<<< HEAD
    meetingEnded = true;
    localStorage.removeItem("activeMeeting");

    //// remove comment
    dispatch(postEndMeeting(meetingId));
    socket.emit("meeting_ended", meetingId);
=======
    localStorage.removeItem('activeMeeting');
    dispatch(postEndMeeting(meetingId));
    socket.emit('meeting_ended');
>>>>>>> 07cc31fdfa8d116cfdadda061facb9964fee1d0d
    setTimeout(() => {
      alert('End meeting');
      window.location.replace('/dashboard');
    }, 1000);
    // } else {
    //   dispatch(showAlertMessage("You must be connected to end meeting"));
    // }
  };

  useEffect(() => {
    dispatch(getAppointmentByAppointmentId(meetingId));
  }, []);

  useEffect(() => {
    socket.on('welcome', async () => {
      try {
        const offer = await peerConnectionRef.current.createOffer({
          iceRestart: true,
        });

        await peerConnectionRef.current?.setLocalDescription(offer);
        socket.emit('offer', offer, meetingId);
      } catch (error) {
        console.log(error);
      }
    });

    socket.on('offer', async (offer) => {
      try {
        await peerConnectionRef.current.setRemoteDescription(offer);
        const answer = await peerConnectionRef.current.createAnswer();
<<<<<<< HEAD
        // console.log("Received offer");
=======

>>>>>>> 07cc31fdfa8d116cfdadda061facb9964fee1d0d
        await peerConnectionRef.current?.setLocalDescription(answer);

        // console.log("Sending answer");
        socket.emit('answer', answer, meetingId);
      } catch (error) {
        console.log(error);
      }
    });

    socket.on('answer', async (answer) => {
      try {
        await peerConnectionRef.current.setRemoteDescription(answer);
      } catch (error) {
        console.log(error);
      }
    });

    socket.on('ice', async (ice) => {
      try {
        if (ice) {
          const user = JSON.parse(localStorage.getItem('user'));
          const activeMeeting = JSON.parse(
            localStorage.getItem('activeMeeting')
          );
          connectionMade = true;

          // update video start time here
          // if there is no active meeting, then update the start time
          if (!activeMeeting) {
            dispatch(
              postStartMeeting({
                appointmentData: {
                  appointmentId: meetingId,
                  userId: user.userId,
                },
                history,
              })
            );
          }
<<<<<<< HEAD
=======

          console.log('connected !!');
>>>>>>> 07cc31fdfa8d116cfdadda061facb9964fee1d0d
        } else {
          peer_left = true;
        }
        await peerConnectionRef?.current?.addIceCandidate(ice);
      } catch (error) {
        console.log(error);
      }
    });
<<<<<<< HEAD
    socket.on("peer_left", async (ice) => {
      console.log("Peer left, closing connection");
      setDisplay("none");
=======
    socket.on('peer_left', async () => {
      // console.log("Peer left, closing connection");
>>>>>>> 07cc31fdfa8d116cfdadda061facb9964fee1d0d
      peerConnectionRef?.current.close();
      peerConnectionRef.current = new RTCPeerConnection({
        iceServers: [
          {
            urls: [
              'stun:stun.l.google.com:19302',
              'stun:stun1.l.google.com:19302',
              'stun:stun2.l.google.com:19302',
              'stun:stun3.l.google.com:19302',
              'stun:stun4.l.google.com:19302',
            ],
          },
        ],
      });
      peerConnectionRef.current.addEventListener('icecandidate', handleIce);
      peerConnectionRef.current.addEventListener('addstream', handleAddStream);
      init();
    });

    init();

<<<<<<< HEAD
    // socket.on("meeting_ended", () => {
    //   // add router to show alert before redirecting to dashboard
    //   console.log("Meeting endedMeeting endedMeeting endedMeeting ended");
    //   alert("Meeting ended");
    //   localStorage.removeItem("activeMeeting");
    //   setTimeout(() => {
    //     window.location.replace("/dashboard");
    //   }, 2000);
    // });
=======
    socket.on('meeting_ended', async () => {
      // add router to show alert before redirecting to dashboard

      alert('Meeting ended');
      setTimeout(() => {
        localStorage.removeItem('activeMeeting');
        window.location.replace('/dashboard');
      }, 2000);
    });
>>>>>>> 07cc31fdfa8d116cfdadda061facb9964fee1d0d

    return () => {
      myStream.current?.getTracks().forEach((track) => track.stop());
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;

      // socket.close();
      // socket.removeAllListeners();
      if (!connectionMade) {
        localStorage.removeItem('activeMeeting');
      }
      /**
       * on dismounting, remove localstorage activeMeeting only when:
       * 1. the connection was never made
       * 2. connection was made and peer left (no one is in the room)
       */
    };
  }, [meetingId, init]);

  function handleIce(data) {
    socket.emit('ice', data.candidate, meetingId);
  }

  function handleAddStream(data) {
    peerVideoRef.current.srcObject = data.stream;
  }

  function handleScreenSwitch() {
    if (peerVideoRef.current) {
      peerVideoRef.current.requestFullscreen();
    }
  }

<<<<<<< HEAD
=======
  const meetingInfoStyles = {
    fontSize: '0.9rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  };

>>>>>>> 07cc31fdfa8d116cfdadda061facb9964fee1d0d
  return (
    <>
      <Container
        maxWidth="lg"
        color="primary.main"
        display="flex"
        sx={{
          position: 'absolute',
          left: '25%',
          // right: "auto",
        }}
      >
        <Grid container spacing={2} sx={{}}>
          {/* 🎃 VIDEO 1 */}
          <Grid item md={8} sx={{ padding: 0 }}>
            <CardMedia
              component="video"
              ref={peerVideoRef}
              autoPlay
              playsInline
              onClick={handleScreenSwitch}
              sx={{
<<<<<<< HEAD
                display: { display },
                border: "2px solid white",
                borderRadius: "10px",
                height: "568.984px",
                width: "758.656px",
                cursor: "pointer",
=======
                border: '2px solid white',
                borderRadius: '10px',
                height: '568.984px',
                width: '758.656px',
                cursor: 'pointer',
>>>>>>> 07cc31fdfa8d116cfdadda061facb9964fee1d0d
              }}
            ></CardMedia>
          </Grid>
          <Grid
            item
            md={8}
            sx={{
              // height: "100%",
              // width: "100%",
              padding: 0,
              display: display === "none" ? "block" : "none",
            }}
          >
            <PersonOffIcon sx={{ width: "70%", height: "70%" }}></PersonOffIcon>
          </Grid>

          <Grid
            item
            md={4}
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* 🎃 MEETING INFO */}
            <MeetingInfo meetingId={meetingId} />
            {/* <Box
            <Box
              sx={{
                backgroundColor: "#e1e8eb",
                padding: "2px",
                borderRadius: "10px",
                marginBottom: "10px",
              }}
            >
              <Typography sx={meetingInfoStyles}>
                <AccountBoxIcon />
                {appointmentData &&
                  appointmentData.client.firstName +
                    " " +
                    appointmentData.client.lastName}

              </Typography>

              <Typography sx={meetingInfoStyles}>
                <AccountBoxIcon />
                {appointmentData &&
                  appointmentData.consultant.firstName +
                    " " +
                    appointmentData.consultant.lastName}

              </Typography>

              <Typography sx={meetingInfoStyles}>
                <TimelapseIcon />
                Time elapsed here...or remaining
              </Typography>
            </Box> */}

            {/* 🎃 CHAT */}
            <Chat socket={socket} meetingId={meetingId} />
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
              ref={videoRef}
              autoPlay
              playsInline
              sx={{
                position: 'absolute',
                width: '300px',
                top: '52.8%',
                right: '35.5%',
                border: '2px solid white',
                borderRadius: '10px',
              }}
            ></CardMedia>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Meeting;
