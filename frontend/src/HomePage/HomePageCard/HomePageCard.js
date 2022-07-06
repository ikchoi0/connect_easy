import React from 'react';

import Grid from '@mui/material/Grid';

import Container from '@mui/material/Container';

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Avatar, Button } from '@mui/material';

export default function HomePageCard() {
  const theme = useTheme();
  return (
    <Container sx={{ py: 8 }} maxWidth="md">
      {/* End hero unit */}
      <Grid container spacing={4}>
        {[
          'Sales',
          'Therapists',
          'Lawyers',
          'Developers',
          'Mortgage',
          'Doctors',
        ].map((card) => (
          <Grid item key={card} xs={12} sm={6}>
            <Card sx={{ display: 'flex', height: 150 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                  <Typography component="div" variant="h5" sx={{ width: 250 }}>
                    {card}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                  >
                    Mac Miller
                  </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                  <Button>Learn More</Button>
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '80%',
                  justifyContent: 'center',
                }}
              >
                <Avatar />
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
