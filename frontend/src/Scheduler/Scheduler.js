import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import './Scheduler.css';
import { Container } from '@mui/material';
// Setup the localizer by providing the moment (or globalize, or Luxon) Object
// to the correct localizer.
const localizer = momentLocalizer(moment); // or globalizeLocalizer

/**
 * https://jquense.github.io/react-big-calendar/
 */

const events = [
  {
    id: 0,
    title: 'Board meeting',
    start: new Date(2022, 6, 29, 9, 0, 0),
    end: new Date(2022, 6, 29, 13, 0, 0),
    resourceId: 1,
  },
  {
    id: 1,
    title: 'MS training',
    allDay: true,
    start: new Date(2022, 6, 19, 14, 0, 0),
    end: new Date(2022, 6, 19, 16, 0, 0),
    resourceId: 2,
  },
  {
    id: 2,
    title: 'Team lead meeting',
    start: new Date(2022, 6, 23, 9, 0, 0),
    end: new Date(2022, 6, 24, 13, 0, 0),
    resourceId: 3,
  },
  {
    id: 11,
    title: 'Birthday Party',
    start: new Date(2022, 6, 5, 9, 0, 0),
    end: new Date(2022, 6, 8, 13, 0, 0),
    resourceId: 4,
  },
];

export default function Scheduler() {
  return (
    <Container sx={{ height: '780px' }}>
      <Calendar
        events={events}
        localizer={localizer}
        showMultiDayTimes
        step={30}
        views={['week', 'month']}
        defaultView={'month'}
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={(e) => {
          console.log(e);
        }}
        onSelectSlot={(e) => {
          console.log(e);
        }}
        selectable
      />
    </Container>
  );
}
