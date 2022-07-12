import React from 'react';
import { useEffect, useRef, useState, useCallback } from 'react';
import { io } from 'socket.io-client';
import VideoFrame from './VideoFrame';

const Meeting = ({ meetingId }) => {
  const socket = io('http://localhost:5002');
  // const [videoRef, setVideoRef] = useState(null);
  // const [peerVideoRef, setPeerVideoRef] = useState(null);

  const peerVideoRef = useRef(null);
  const videoRef = useRef(null);
  const peerConnectionRef = useRef(null);

  useEffect(() => {
    console.log('PEERCONNECTIONREF', peerConnectionRef);

    peerConnectionRef.current = new RTCPeerConnection();
    peerConnectionRef.current.addEventListener('icecandidate', handleIce);
    peerConnectionRef.current.addEventListener('addstream', handleAddStream);

    socket.on('check-if-user-was-here');

    socket.on('welcome', async () => {
      try {
        console.log('Sending offer');
        const offer = await peerConnectionRef.current?.createOffer();

        await peerConnectionRef.current?.setLocalDescription(offer);
        socket.emit('offer', offer, meetingId);
      } catch (error) {
        console.log(error);
      }
    });

    socket.on('offer', async (offer) => {
      try {
        await peerConnectionRef.current?.setRemoteDescription(offer);

        const answer = await peerConnectionRef.current?.createAnswer();

        console.log('Received offer');
        await peerConnectionRef.current?.setLocalDescription(answer);

        console.log('Sending answer');
        socket.emit('answer', answer, meetingId);
      } catch (error) {
        console.log(error);
      }
    });

    socket.on('answer', async (answer) => {
      try {
        console.log('Received answer');
        console.log(answer);
        await peerConnectionRef.current?.setRemoteDescription(answer);
      } catch (error) {
        console.log(error);
      }
    });

    socket.on('ice', async (ice) => {
      try {
        console.log('received candidate');
        await peerConnectionRef.current?.addIceCandidate(ice);
      } catch (error) {
        console.log(error);
      }
    });

    init();

    return () => {
      // socket.emit('disconnect-meeting', meetingId);
      // socket.off();
      socket.close();
      peerConnectionRef.current?.close();
      peerConnectionRef.current = null;
    };
  }, [meetingId, init]);

  const getCamera = async (myFace) => {
    try {
      const initialConstraints = {
        audio: false,
        video: true,
      };

      const myStream = await navigator.mediaDevices.getUserMedia(
        initialConstraints
      );
      console.log(myStream);
      myFace.srcObject = myStream;

      // myFace.onloadedmetadata = () => {
      //   myFace.play();
      // };

      return myStream;
    } catch (err) {
      console.log(err);
    }
  };

  function handleIce(data) {
    console.log('sent candidate');
    socket.emit('ice', data.candidate, meetingId);
  }

  function handleAddStream(data) {
    console.log('DATA FROM ADD STREAM:', data);
    let peerVideo = peerVideoRef.current;
    console.log('PEER VIDEO REF', peerVideo);

    peerVideo.srcObject = data.stream;
  }

  async function init() {
    let video = videoRef.current;
    console.log('MY FACE VIDEO REF', video);

    socket.emit('join_room', meetingId);

    const myStreamResult = await getCamera(video);

    myStreamResult
      .getTracks()
      .forEach((track) =>
        peerConnectionRef.current?.addTrack(track, myStreamResult)
      );
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
        width={'200px'}
        height={'200px'}
      ></video>
      <h2>This is video 2</h2>

      {/* <VideoFrame setVideoRef={setVideoRef} />
      <VideoFrame setVideoRef={setPeerVideoRef} /> */}
    </>
  );
};

export default Meeting;
