import React, { useEffect, useRef } from "react";

function VideoFrame({ setVideoRef }) {
  const videoRef = useRef();

  useEffect(() => {
    setVideoRef(videoRef);
  }, []);

  return (
    <>
      <video
        id="myFace"
        ref={videoRef}
        autoPlay
        playsInline
        width={"400px"}
        height={"400px"}
      ></video>
    </>
  );
}

export default VideoFrame;
