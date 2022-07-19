import * as React from "react";
import Box from "@mui/material/Box";
import { Typography, Grid, Paper } from "@mui/material";

function HomePageHeroLayout(props) {
  return (
    <Paper
      sx={{
        position: "relative",
        backgroundColor: "grey.800",
        color: "#fff",
        mb: 4,
        mt: 6,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: `url(https://i.ibb.co/0DCjYB4/Banner-1.png)`,
      }}
    >
      {
        <img
          style={{ display: "none" }}
          src={"https://i.ibb.co/0DCjYB4/Banner-1.png"}
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
              sx={{
                fontWeight: "bold",
                textShadow: "2px 2px 2px #575757;",
              }}
            >
              Everything you need to manage your business as a service
              professional
            </Typography>
            <Typography
              variant="h7"
              color="inherit"
              paragraph
              sx={{
                fontStyle: "italic",
                textShadow: "2px 2px 2px #575757;",
              }}
            >
              Schedule meetings, host video calls, and collect payments all in
              one place.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default HomePageHeroLayout;
