import React, { useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import './Scheduler.css';
import { Container, Box } from '@mui/material';
import TimeSlots from './TimeSlots';
import HomePageAppBar from '../HomePage/HomePageAppBar/HomePageAppBar';
import OpenAppointment from '../OpenAppointment/OpenAppointment';
import { useDispatch, useSelector } from 'react-redux';
import { getAppointmentsForConsultant } from '../store/reducers/scheduleReducer';
// Setup the localizer by providing the moment (or globalize, or Luxon) Object
// to the correct localizer.
const localizer = momentLocalizer(moment); // or globalizeLocalizer

/**
 * https://jquense.github.io/react-big-calendar/
 */

export default function Scheduler() {
  const [openTimeSlots, setOpenTimeSlots] = React.useState(false);
  const [selectedEvent, setSelectedEvent] = React.useState(null);
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const scheduler = useSelector((state) => state.scheduler);

  const dispatch = useDispatch();

  useEffect(() => {
    const consultant = localStorage.getItem('user');
    if (consultant) {
      const consultantId = JSON.parse(consultant).userId;
      console.log(consultantId);

      dispatch(getAppointmentsForConsultant(consultantId));
    }
  }, []);

  const handleOpenTimeSlots = (e) => {
    setOpenTimeSlots(true);
    setSelectedDate(e.start);
  };
  return (
    <>
      <Container
        sx={{
          marginTop: 8,
          height: '780px',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ width: '100%' }}>
          <Calendar
            events={scheduler && scheduler.appointments}
            localizer={localizer}
            showMultiDayTimes
            step={30}
            views={'month'}
            defaultView={'month'}
            startAccessor="start"
            endAccessor="end"
            onSelectEvent={(e) => {
              console.log(e);
            }}
            onSelectSlot={(e) => {
              console.log(e);
              handleOpenTimeSlots(e);
            }}
            selectable
          />
        </Box>
        {openTimeSlots && <TimeSlots selectedDate={selectedDate} />}
      </Container>
    </>
  );
}
