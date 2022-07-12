import React from "react";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import VideoFrame from "./VideoFrame";

const socket = io("http://localhost:5002");

const Meeting = ({ meetingId }) => {
  // const [videoRef, setVideoRef] = useState(null);
  // const [peerVideoRef, setPeerVideoRef] = useState(null);

  const peerVideoRef = useRef(null);
  const videoRef = useRef(null);

  let myPeerConnection;
  let myStream;

  useEffect(() => {
    myPeerConnection.addEventListener("icecandidate", handleIce);
    myPeerConnection.addEventListener("addstream", handleAddStream);
    init();
    return () => {
      socket.close();
    };
  }, [meetingId]);

  const getCamera = async (myFace) => {
    try {
      const initialConstraints = {
        audio: false,
        video: true,
      };

      myStream = await navigator.mediaDevices.getUserMedia(initialConstraints);
      console.log(myStream);
      myFace.srcObject = myStream;
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
    console.log("DATA FROM ADD STREAM:", data);
    let peerVideo = peerVideoRef.current;
    console.log("PEER VIDEO REF", peerVideo);

    peerVideo.srcObject = data.stream;
    socket.on("welcome", async () => {
      try {
        console.log("Sending offer");
        const offer = await myPeerConnection.createOffer();

        await myPeerConnection.setLocalDescription(offer);
        socket.emit("offer", offer, meetingId);
      } catch (error) {
        console.log(error);
      }
    });

    socket.on("offer", async (offer) => {
      try {
        await myPeerConnection.setRemoteDescription(offer);

        console.log("🧩🧩🧩🧩🧩 does it work?");
        const answer = await myPeerConnection.createAnswer();

        console.log("Received offer");
        await myPeerConnection.setLocalDescription(answer);

        console.log("Sending answer");
        socket.emit("answer", answer, meetingId);
      } catch (error) {
        console.log(error);
      }
    });

    socket.on("answer", async (answer) => {
      try {
        console.log("Received answer");
        console.log(answer);
        if (!myPeerConnection.remoteDescription) {
          await myPeerConnection.setRemoteDescription(answer);
        }
        console.log(myPeerConnection);
      } catch (error) {
        console.log(error);
      }
    });

    socket.on("ice", async (ice) => {
      try {
        console.log("received candidate");
        await myPeerConnection.addIceCandidate(ice);
      } catch (error) {
        console.log(error);
      }
    });
  }
  async function init() {
    let video = videoRef.current;
    myPeerConnection = new RTCPeerConnection();
    myStream = await getCamera(video);

    console.log("MY FACE VIDEO REF", video);

    socket.emit("join_room", meetingId);

    myStream
      .getTracks()
      .forEach((track) => myPeerConnection.addTrack(track, myStream));
  }
  //TODO: MY STREAM

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
        width={"200px"}
        height={"200px"}
      ></video>
      <h2>This is video 2</h2>

      {/* <VideoFrame setVideoRef={setVideoRef} />
      <VideoFrame setVideoRef={setPeerVideoRef} /> */}
    </>
  );
};

export default Meeting;
