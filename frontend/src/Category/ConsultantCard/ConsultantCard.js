import React from 'react';
import { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardMedia } from '@mui/material';
import Scheduler from '../../Scheduler/Scheduler';
import DialogPopUp from '../../shared/components/DialogPopUp';
import { useDispatch } from 'react-redux';
import { clearAppointmentsList } from '../../store/reducers/scheduleReducer';

const CategoryCard = ({
  consultantId,
  firstName,
  lastName,
  profilePicture,
  description,
  rating,
  price,
}) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    if (!user) {
      alert('Please login to book an appointment');
    }
    handleClickOpen();
  };
  const [open, setOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    dispatch(clearAppointmentsList());
    setOpen(false);
  };

  return (
    <>
      <Card onClick={handleClick}>
        <CardMedia
          component="img"
          height="120px"
          width="100%"
          image={
            profilePicture
              ? 'https://connect-easy-images.s3.us-west-2.amazonaws.com/' +
                profilePicture
              : 'https://i.ibb.co/9tCfDKv/defaultprofilepicture.png'
          }
          alt="profile picture"
        />
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography
            component="span"
            variant="h6"
            color="text.primary"
            sx={{ width: 250 }}
          >
            {firstName} {lastName}
          </Typography>

          <Typography component="div" variant="body1" color="text.secondary">
            {description || (
              <Box sx={{ fontStyle: 'italic' }}>
                Service description pending
              </Box>
            )}
          </Typography>

          <Typography variant="body2" color="text.secondary" component="div">
            {rating && `Rating: ${rating}`}
            {!rating && '-'}
          </Typography>

          <Typography variant="body2" color="text.secondary" component="div">
            Price per hour: ${price}
          </Typography>
        </CardContent>
      </Card>
      <DialogPopUp onClose={handleClose} open={open}>
        <Scheduler selectable consultantId={consultantId} />
      </DialogPopUp>
    </>
  );
};

export default CategoryCard;
