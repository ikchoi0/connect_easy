import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAppointmentsForTheDay } from '../store/reducers/scheduleReducer';
import moment from 'moment';

const Item = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  border: '2px solid #e0e0e0',
}));

export default function TimeSlots(props) {
  const [selectedDate, setSelectedDate] = React.useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    setSelectedDate(props.selectedDate.toLocaleDateString());
    const date = moment(props.selectedDate).format('YYYY-MM-DD');
    dispatch(getAppointmentsForTheDay(date));
  }, [props.selectedDate, dispatch]);

  return (
    <Box sx={{ width: '20%', marginLeft: 3 }}>
      <Typography variant="h6" gutterBottom>
        {' '}
        {selectedDate}{' '}
      </Typography>
      <Stack spacing={2}>
        <Item>Item 1</Item>
        <Item>Item 2</Item>
        <Item>Item 3</Item>
      </Stack>
    </Box>
  );
}
