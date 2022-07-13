import React, { useState } from 'react';
import {
  Box,
  Button,
  Grid,
  Typography,
  ButtonGroup,
  Paper,
  listItemSecondaryActionClasses,
} from '@mui/material';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAppointmentsForTheDay } from '../store/reducers/scheduleReducer';
import moment from 'moment';
import SchedulerDetailsInputs from './SchedulerDetailsInputs';
import { bookAppointment } from '../store/reducers/scheduleReducer';
import { useHistory } from 'react-router-dom';
import DialogPopUp from '../shared/components/DialogPopUp';
import ConfirmModal from '../shared/components/ConfirmModal';

const Item = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  border: '2px solid #e0e0e0',
}));

export default function TimeSlots(props) {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedAppointmentId, setSelectedAppointmentId] = useState('');
  const [confirm, setConfirm] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const appointmentsForDay = useSelector(
    (state) => state.scheduler.appointmentsForSelectedDate
  );

  useEffect(() => {
    setSelectedDate(props.selectedDate.toLocaleDateString());

    const date = moment(props.selectedDate).format('YYYY-MM-DD');

    dispatch(
      getAppointmentsForTheDay({ consultantId: props.consultantId, date })
    );
  }, [props.selectedDate, dispatch]);

  const handleDismissOnClick = () => {
    setSelectedAppointmentId('');
  };

  const handledBookingAppointment = () => {
    setConfirm(true);
  };

  const handleConfirmClose = () => {
    const appointmentData = {
      description: props.description,
      selectedAppointmentId,
    };

    // dispatch(bookAppointment({ appointmentData, history }));
    setConfirm(false);
  };

  const items = appointmentsForDay.map((item) => (
    <Item key={item.appointmentId}>
      <div
        onClick={() => setSelectedAppointmentId(item.appointmentId)}
        value={item.appointmentId}
      >
        <Box sx={{ display: 'flex', gap: '1rem' }}>
          <Typography variant="subtitle1">
            {moment(item.start).format('HH:mm')}
          </Typography>

          <Typography variant="subtitle1">-</Typography>

          <Typography variant="subtitle1">
            {moment(item.end).format('HH:mm')}
          </Typography>
        </Box>
      </div>
    </Item>
  ));

  return (
    <Box
      sx={{
        width: '20%',
        marginLeft: 3,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h6" gutterBottom>
        {selectedDate}
      </Typography>

      <Stack spacing={2}>
        {items && items}
        {/* {!selectedAppointmentId ? (
          items
        ) : (
          <>
            <SchedulerDetailsInputs
              description={props.description}
              setDescription={props.setDescription}
            />
          </>
        )}
        {appointmentsForDay.length > 0 && (
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button onClick={handleDismissOnClick}>Dismiss</Button>
            <Button onClick={handledBookingAppointment}>Book</Button>
          </Box>
        )} */}
      </Stack>
      {confirm && (
        <DialogPopUp open={confirm}>
          <ConfirmModal onConfirm={handleConfirmClose} />
        </DialogPopUp>
      )}
    </Box>
  );
}
