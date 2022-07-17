import React, { useCallback, useState } from 'react';
import { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import VideoCallButtons from './VideoCallButtons';
import { Container, CardMedia, Grid } from '@mui/material';
import {
  postStartMeeting,
  postEndMeeting,
  getPastMessages,
} from '../store/reducers/meetingReducer';
import Chat from '../Chat/Chat';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import MeetingInfo from './MeetingInfo';
const Meeting = ({ meetingId, socket }) => {
  const dispatch = useDispatch();

  const [display, setDisplay] = useState('none');
  const history = useHistory();
  const peerVideoRef = useRef(null);
  const videoRef = useRef(null);
  const myStream = useRef(null);
  const peerConnectionRef = useRef(null);

  let meetingEnded = false;
  let connectionMade = false;
  let peer_left;

  const { conversations } = useSelector((state) => state.meeting);

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
      if (peerConnectionRef.current.iceConnectionState === 'disconnected') {
        setDisplay('none');
      } else {
        setDisplay('block');
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
    meetingEnded = true;
    localStorage.removeItem('activeMeeting');

    //// remove comment
    dispatch(postEndMeeting(meetingId));
    socket.emit('meeting_ended', meetingId);
    setTimeout(() => {
      alert('End meeting');
      window.location.replace('/dashboard');
    }, 1000);
    // } else {
    //   dispatch(showAlertMessage("You must be connected to end meeting"));
    // }
  };

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
        // console.log("Received offer");
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
        } else {
          peer_left = true;
        }
        await peerConnectionRef?.current?.addIceCandidate(ice);
      } catch (error) {
        console.log(error);
      }
    });
    socket.on('peer_left', async (ice) => {
      console.log('Peer left, closing connection');
      setDisplay('none');
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

    // socket.on("meeting_ended", () => {
    //   // add router to show alert before redirecting to dashboard
    //   console.log("Meeting endedMeeting endedMeeting endedMeeting ended");
    //   alert("Meeting ended");
    //   localStorage.removeItem("activeMeeting");
    //   setTimeout(() => {
    //     window.location.replace("/dashboard");
    //   }, 2000);
    // });

    // get past meeting messages
    dispatch(getPastMessages(meetingId));

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
                display: { display },
                border: '2px solid white',
                borderRadius: '10px',
                height: '568.984px',
                width: '758.656px',
                cursor: 'pointer',
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
              display: display === 'none' ? 'block' : 'none',
            }}
          >
            <PersonOffIcon sx={{ width: '70%', height: '70%' }}></PersonOffIcon>
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
            <Chat
              socket={socket}
              meetingId={meetingId}
              pastMessages={conversations ? conversations : []}
            />
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
