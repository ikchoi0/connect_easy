import React from 'react'
import { Card } from "@mui/material";
import Typography from "@mui/material/Typography";

const AppointmentCard = ({date, startTime, endTime, description}) => {
  return (
    <Card sx={{ margin: 2 }}>
      <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="center">
        {description}
      </Typography>
      <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="center">
        {date}
      </Typography>
      <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="center">
        {startTime}
      </Typography>
      <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="center">
        {endTime}
      </Typography>
    </Card>
  )
}

export default AppointmentCard