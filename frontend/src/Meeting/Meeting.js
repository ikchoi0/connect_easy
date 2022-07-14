import React from 'react';
import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateAppointmentVideoStartTime } from '../store/reducers/meetingReducer';
import VideoCall from './VideoCall';

const Meeting = ({ meetingId }) => {
  const dispatch = useDispatch();
  const socket = io('http://localhost:5002');
  // const [videoRef, setVideoRef] = useState(null);
  // const [peerVideoRef, setPeerVideoRef] = useState(null);
  const history = useHistory();
  const peerVideoRef = useRef(null);
  const videoRef = useRef(null);
  const myStream = useRef(null);
  let peerConnectionRef;
  let peerVideo;
  let video;

  useEffect(() => {
    // console.log("PEERCONNECTIONREF", peerConnectionRef);

    peerConnectionRef = new RTCPeerConnection();
    peerConnectionRef.addEventListener('icecandidate', handleIce);
    peerConnectionRef.addEventListener('addstream', handleAddStream);

    socket.on('welcome', async () => {
      try {
        // console.log("Sending offer");
        const offer = await peerConnectionRef?.createOffer({
          iceRestart: true,
        });

        await peerConnectionRef?.setLocalDescription(offer);
        socket.emit('offer', offer, meetingId);
      } catch (error) {
        console.log(error);
      }
    });

    socket.on('offer', async (offer) => {
      try {
        await peerConnectionRef?.setRemoteDescription(offer);

        const answer = await peerConnectionRef?.createAnswer();

        // console.log("Received offer");
        await peerConnectionRef?.setLocalDescription(answer);

        // console.log("Sending answer");
        socket.emit('answer', answer, meetingId);
      } catch (error) {
        console.log(error);
      }
    });

    socket.on('answer', async (answer) => {
      try {
        // console.log("Received answer");
        // console.log(answer);

        await peerConnectionRef?.setRemoteDescription(answer);
      } catch (error) {
        console.log(error);
        socket.emit('leave', meetingId);
        // window.location.replace("/dashboard");
      }
    });

    socket.on('ice', async (ice) => {
      try {
        // console.log("received candidate", ice);
        if (ice) {
          // update video start time here
          dispatch(
            updateAppointmentVideoStartTime({
              appointmentData: { appointmentId: meetingId },
              history,
            })
          );
          // console.log("connected !!");
        }
        await peerConnectionRef?.addIceCandidate(ice);
      } catch (error) {
        // console.log(error);
      }
    });
    socket.on('peer_left', async (ice) => {
      // console.log("Peer left, closing connection");
      peerConnectionRef?.close();
      peerConnectionRef = new RTCPeerConnection();
      peerConnectionRef.addEventListener('icecandidate', handleIce);
      peerConnectionRef.addEventListener('addstream', handleAddStream);
      init();
    });

    init();

    return () => {
      myStream.current?.getTracks().forEach((track) => track.stop());
      peerConnectionRef?.close();
      peerConnectionRef = null;
      socket.close();
      video = null;
      socket.removeAllListeners();
    };
  }, [meetingId, init]);

  const getCamera = async (myFace) => {
    try {
      const initialConstraints = {
        audio: false,
        video: true,
      };

      myStream.current = await navigator.mediaDevices.getUserMedia(
        initialConstraints
      );
      // console.log(myStream.current);
      myFace.srcObject = myStream.current;
      return myStream.current;
    } catch (err) {
      // console.log(err);
    }
  };

  function handleIce(data) {
    // console.log("sent candidate");
    // console.log("#######ICE########", data);
    socket.emit('ice', data.candidate, meetingId);
  }

  function handleAddStream(data) {
    // console.log("DATA FROM ADD STREAM:", data);
    peerVideo = peerVideoRef.current;
    // console.log("PEER VIDEO REF", peerVideo);

    peerVideo.srcObject = data.stream;
  }

  async function init() {
    video = videoRef.current;
    // console.log("MY FACE VIDEO REF", video);

    socket.emit('join_room', meetingId);

    const myStreamResult = await getCamera(video);

    myStreamResult
      .getTracks()
      .forEach((track) => peerConnectionRef?.addTrack(track, myStreamResult));
  }

  return (
    <>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        width={'400px'}
        height={'400px'}
      ></video>

      <h2>This is video 1</h2>

      <video
        ref={peerVideoRef}
        autoPlay
        playsInline
        width={'400px'}
        height={'400px'}
      ></video>
      <h2>This is video 2</h2>

      {/* <VideoFrame setVideoRef={setVideoRef} />
      <VideoFrame setVideoRef={setPeerVideoRef} /> */}
    </>
  );
};

export default Meeting;
