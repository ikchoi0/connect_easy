import React, { useCallback } from "react";
import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  postEndMeeting,
  postStartMeeting,
} from "../store/reducers/meetingReducer";
import Chat from "../Chat/Chat";
const Meeting = ({ meetingId }) => {
  const dispatch = useDispatch();
  const socket = io("http://localhost:5002");

  // const socket = io("https://connect-easy-rid.herokuapp.com");

  const history = useHistory();
  const peerVideoRef = useRef(null);
  const videoRef = useRef(null);
  const myStream = useRef(null);
  const peerConnectionRef = useRef(null);

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

    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }

    stream.getTracks().forEach((track) => {
      if (peerConnectionRef.current) {
        peerConnectionRef.current.addTrack(track, stream);
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

  useEffect(() => {
    // console.log("PEERCONNECTIONREF", peerConnectionRef);

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
        socket.emit("leave", meetingId);
        // window.location.replace("/dashboard");
      }
    });

    socket.on("ice", async (ice) => {
      try {
        // console.log("received candidate", ice);
        if (ice) {
          const userId = JSON.parse(localStorage.getItem("user")).userId;
          const activeMeeting = JSON.parse(
            localStorage.getItem("activeMeeting")
          );

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
        // console.log(error);
      }
    });
    socket.on("peer_left", async (ice) => {
      // console.log("Peer left, closing connection");
      peerConnectionRef.current.close();
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
      peerConnectionRef.current.addEventListener("icecandidate", handleIce);
      peerConnectionRef.current.addEventListener("addstream", handleAddStream);
      init();
    });

    init();

    return () => {
      myStream.current?.getTracks().forEach((track) => track.stop());
      peerConnectionRef.current?.close();
      peerConnectionRef.current = null;
      socket.close();
      socket.removeAllListeners();
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
      <Chat socket={socket} />
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

      <button
        onClick={() => {
          localStorage.removeItem("activeMeeting");
          dispatch(postEndMeeting(meetingId));
        }}
      >
        END
      </button>

      {/* <VideoFrame setVideoRef={setVideoRef} />
      <VideoFrame setVideoRef={setPeerVideoRef} /> */}
    </>
  );
};

export default Meeting;
