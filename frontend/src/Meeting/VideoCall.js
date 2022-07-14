import React, { useEffect, useRef } from "react";

function VideoCall({ setVideoRef }) {
  const videoRef = useRef();

  useEffect(() => {
    setVideoRef(videoRef);
  }, []);

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
    </>
  );
}

export default VideoCall;
