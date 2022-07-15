import React from 'react';
import { useEffect, useRef, useCallback, useState } from 'react';
import { io } from 'socket.io-client';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postStartMeeting } from '../store/reducers/meetingReducer';
import { getMe } from '../store/reducers/authReducer';
const Meeting = ({ meetingId }) => {
  const dispatch = useDispatch();
  const socket = io('http://localhost:5002');

  // const socket = io("https://connect-easy-rid.herokuapp.com/api");
  const [connect, setConnect] = useState(true);

  const userDetails = useSelector((state) => state.auth.userDetails);

  const history = useHistory();
  const peerVideoRef = useRef(null);
  const videoRef = useRef(null);

  const connectionStatus = useRef(null);

  const peerConnectionRef = useRef(null);

  const getMedia = useCallback(async () => {
    try {
      const initialConstraints = {
        audio: false,
        video: true,
      };

      const myStream = await navigator.mediaDevices.getUserMedia(
        initialConstraints
      );
      // console.log(myStream.current);
      if (videoRef.current) {
        videoRef.current.srcObject = myStream;
      }
      if (!peerConnectionRef.current) {
        return;
      }

      myStream.getTracks().forEach((track) => {
        peerConnectionRef.current?.addTrack(track, myStream);
      });

      peerConnectionRef.current.onicecandidate = (e) => {
        if (e.candidate) {
          socket.emit('ice', e.candidate, meetingId);
        }
      };

      //if peer connection state changed console.log
      peerConnectionRef.current.oniceconnectionstatechange = (e) => {
        console.log(
          'ICE CONNECTION STATE CHANGE:',
          e.target.iceConnectionState
        );
        if (e.target.iceConnectionState === 'disconnected') {
          console.log('disconnected');
          connectionStatus.current = 'disconnected';

          setConnect(false);
        } else if (e.target.iceConnectionState === 'connected') {
          connectionStatus.current = null;
          setConnect(true);
        }
      };

      // add streams to opposite's video
      peerConnectionRef.current.ontrack = (e) => {
        // console.log("TRACK", e.track);

        if (peerVideoRef.current) {
          console.log(e.streams);
          peerVideoRef.current.srcObject = e.streams[0];
        }
      };

      peerConnectionRef.current.onnegotiationneeded = async () => {
        console.log('onnegotiationneeded');
      };

      socket.emit('join_room', meetingId);
    } catch (err) {
      console.log(err);
    }
  }, [meetingId]);

  useEffect(() => {
    createPeerConnection();

    socket.on('welcome', async () => {
      createOffer();
    });

    socket.on('getOffer', async (offer) => {
      createAnswer(offer);
    });

    socket.on('getAnswer', async (answer) => {
      if (!peerConnectionRef.current) {
        return;
      }
      console.log('getAnswer', answer);
      await peerConnectionRef.current.setRemoteDescription(
        new RTCSessionDescription(answer)
      );
    });

    socket.on('getIce', async (ice) => {
      if (!peerConnectionRef.current) {
        return;
      }

      await peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(ice));
    });

    getMedia();

    if (connectionStatus.current === 'disconnected') {
      console.log('someone is disconnected');
      // setConnect(true);
    }

    return () => {
      // myStream.current?.getTracks().forEach((track) => track.stop());
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    };
  }, [meetingId, getMedia, connect]);

  const createPeerConnection = () => {
    peerConnectionRef.current = new RTCPeerConnection({
      iceServers: [
        {
          urls: ['stun:stun.l.google.com:19302'],
        },
      ],
    });
  };

  const createOffer = async () => {
    if (!peerConnectionRef.current) {
      return;
    }
    console.log('createOffer');

    try {
      const offer = await peerConnectionRef.current.createOffer({
        offerToReceiveVideo: true,
        offerToReceiveAudio: true,
        iceRestart: true,
      });
      await peerConnectionRef.current.setLocalDescription(offer);
      socket.emit('offer', offer, meetingId);
    } catch (error) {
      console.log(error);
    }
  };

  const createAnswer = async (offer) => {
    if (!peerConnectionRef.current) {
      return;
    }
    console.log('createAnswer');
    try {
      await peerConnectionRef.current.setRemoteDescription(
        new RTCSessionDescription(offer)
      );
      const answer = await peerConnectionRef.current.createAnswer({
        offerToReceiveVideo: true,
        offerToReceiveAudio: true,
        iceRestart: true,
      });
      await peerConnectionRef.current.setLocalDescription(
        new RTCSessionDescription(answer)
      );
      socket.emit('answer', answer, meetingId);
    } catch (error) {
      console.log(error);
    }
  };

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
    </>
  );
};

export default Meeting;
