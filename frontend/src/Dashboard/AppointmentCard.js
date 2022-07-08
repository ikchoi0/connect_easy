import React from 'react';
import { Box, Button, Card } from '@mui/material';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { deleteOneAppointment } from '../store/reducers/scheduleReducer';

const AppointmentCard = ({ id, date, startTime, endTime, description }) => {
  const dispatch = useDispatch();
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        border: '1px solid #ccc',
        borderRadius: '5px',
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <Typography
          sx={{ my: 5, mx: 2 }}
          color="text.primary"
          align="center"
          variant="h3"
        >
          {description}
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          flexGrow: 1,
        }}
      >
        <Typography variant="subtitle1">
          Date: {moment(date).format('YYYY-MM-DD')}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Typography color="text.secondary" align="center">
            {startTime}
          </Typography>
          <Typography sx={{ marginX: 1 }} align="center">
            -
          </Typography>
          <Typography color="text.secondary" align="center">
            {endTime}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ flexGrow: 1 }}>
        <Button
          sx={{ flexGrow: 1 }}
          variant="contained"
          color="secondary"
          size="large"
          onClick={() => dispatch(deleteOneAppointment(id))}
        >
          Delete
        </Button>
      </Box>
    </Box>
  );
};

export default AppointmentCard;
