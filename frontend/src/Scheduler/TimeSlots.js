import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { useEffect } from 'react';

const Item = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  border: '1px solid #e0e0e0',
}));

export default function TimeSlots(props) {
  const [selectedDate, setSelectedDate] = React.useState('');

  useEffect(() => {
    setSelectedDate(props.selectedDate.toLocaleDateString());
  }, [props.selectedDate]);
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
