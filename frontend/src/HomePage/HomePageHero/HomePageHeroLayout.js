import * as React from "react";
import { styled } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Typography, Button, Stack, Grid, Paper, Link } from "@mui/material";

function HomePageHeroLayout(props) {
  return (
    <Paper
      sx={{
        position: "relative",
        backgroundColor: "grey.800",
        color: "#fff",
        mb: 4,
        mt: 4,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: `url(https://source.unsplash.com/random)`,
      }}
    >
      {/* Increase the priority of the hero background image */}
      {
        <img
          style={{ display: "none" }}
          src={"https://source.unsplash.com/random"}
          alt={"hi"}
        />
      }
      <Box
        sx={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: "rgba(0,0,0,.3)",
        }}
      />
      <Grid container>
        <Grid item md={6}>
          <Box
            sx={{
              position: "relative",
              p: { xs: 3, md: 6 },
              pr: { md: 0 },
            }}
          >
            <Typography
              variant="h5"
              color="inherit"
              gutterBottom
            >
              Everything you need to manage your business as a service
              professional
            </Typography>
            <Typography variant="h7" color="inherit" paragraph>
              Schedule meetings, host video calls, and collect payments all in
              one place.
            </Typography>
            {/* <Link variant="subtitle1" href="#">
              hihi
            </Link> */}
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default HomePageHeroLayout;
