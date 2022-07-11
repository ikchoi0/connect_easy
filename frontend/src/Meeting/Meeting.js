import React from "react";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import VideoFrame from "./VideoFrame";

const socket = io("http://localhost:5002");

const Meeting = ({ meetingId }) => {
  // const [videoRef, setVideoRef] = useState(null);
  // const [peerVideoRef, setPeerVideoRef] = useState(null);

  const videoRef = useRef();
  const peerVideoRef = useRef();

  let myPeerConnection;
  let myStream;

  useEffect(() => {
    init();
    myPeerConnection = new RTCPeerConnection();
    myPeerConnection.addEventListener("icecandidate", handleIce);
    myPeerConnection.addEventListener("addstream", handleAddStream);
  }, [videoRef, peerVideoRef, meetingId, myPeerConnection, init]);

  const getCamera = async (myFace) => {
    try {
      const initialConstraints = {
        audio: false,
        video: true,
      };

      myStream = await navigator.mediaDevices.getUserMedia(initialConstraints);
      myFace.srcObject = myStream;

      // myFace.onloadedmetadata = () => {
      //   myFace.play();
      // };
    } catch (err) {
      console.log(err);
    }
    return myStream;
  };

  function handleIce(data) {
    console.log("sent candidate");
    socket.emit("ice", data.candidate, meetingId);
  }

  function handleAddStream(data) {
    console.log(data);
    let peerVideo = peerVideoRef.current;
    console.log("PEER VIDEO REF", peerVideo);

    peerVideo.srcObject = data.stream;
  }
  async function init() {
    let video = videoRef.current;
    console.log("MY FACE VIDEO REF", video);

    myStream = await getCamera(video);

    myStream
      .getTracks()
      .forEach((track) => myPeerConnection.addTrack(track, myStream));
  }
  //TODO: MY STREAM

  socket.emit("join_room", meetingId);

  socket.on("welcome", async () => {
    const offer = await myPeerConnection.createOffer();

    await myPeerConnection.setLocalDescription(offer);

    console.log("Sending offer");
    socket.emit("offer", offer, meetingId);
  });

  socket.on("offer", async (offer) => {
    await myPeerConnection.setRemoteDescription(offer);

    console.log("🧩🧩🧩🧩🧩 does it work?");
    const answer = await myPeerConnection.createAnswer();

    console.log("Received offer");
    await myPeerConnection.setLocalDescription(answer);

    console.log("Sending answer");
    socket.emit("answer", answer, meetingId);
  });

  socket.on("answer", async (answer) => {
    console.log("Received answer");
    console.log(answer);
    await myPeerConnection.setRemoteDescription(answer);
  });

  socket.on("ice", async (ice) => {
    console.log("received candidate");
    await myPeerConnection.addIceCandidate(ice);
  });

  return (
    <>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        width={"400px"}
        height={"400px"}
      ></video>

      <h2>This is video 1</h2>

      <video
        ref={peerVideoRef}
        autoPlay
        playsInline
        width={"400px"}
        height={"400px"}
      ></video>
      <h2>This is video 2</h2>

      {/* <VideoFrame setVideoRef={setVideoRef} />
      <VideoFrame setVideoRef={setPeerVideoRef} /> */}
    </>
  );
};

export default Meeting;
