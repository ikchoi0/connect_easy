import React, { useState } from "react";
import { Box } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
/**
 * https://reactdatepicker.com/
 */

function OpenAppointment() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  return (
    <Box>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15}
        timeCaption="Time"
        dateFormat="h:mm aa"
      />
      <DatePicker
        selected={endDate}
        onChange={(date) => {
          setEndDate(date);
        }}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15}
        timeCaption="Time"
        dateFormat="h:mm aa"
      />
      <>
        {startDate.toLocaleTimeString()}
        {endDate.toLocaleTimeString()}
      </>
    </Box>
  );
}

export default OpenAppointment;
