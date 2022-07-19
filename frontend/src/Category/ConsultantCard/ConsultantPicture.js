import React from 'react';
import { CardMedia } from '@mui/material';

const ConsultantPicture = ({ profilePicture }) => {

  return (
    <CardMedia
      component="img"
      sx={{height: "210px"}}
      image={
        profilePicture
          ? 'https://connect-easy-images.s3.us-west-2.amazonaws.com/' +
            profilePicture
          : 'https://i.ibb.co/9tCfDKv/defaultprofilepicture.png'
      }
      alt="profile picture"
    />
  );
};

export default ConsultantPicture;
