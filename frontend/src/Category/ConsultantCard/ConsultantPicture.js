import React from "react";
import { CardMedia } from "@mui/material";
import ConsultantCard from "./ConsultantCard";

const ConsultantPicture = ({ profilePicture }) => {
  return (
    <CardMedia
      component="img"
      height="120px"
      width="100%"
      image={
        profilePicture || "https://i.ibb.co/9tCfDKv/defaultprofilepicture.png"
      }
      alt="profile picture"
    />
  );
};

export default ConsultantPicture;