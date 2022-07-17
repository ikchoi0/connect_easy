import React from "react";
import { useState } from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardMedia } from "@mui/material";
import Scheduler from "../../Scheduler/Scheduler";
import DialogPopUp from "../../shared/components/DialogPopUp";
import { useDispatch } from "react-redux";
import { clearAppointmentsList } from "../../store/reducers/scheduleReducer";
import { red } from "@mui/material/colors";
import AlertNotification from "../../shared/components/AlertNotification";
import { Alert, Grid } from "@mui/material";
const CategoryCard = ({
  consultantId,
  firstName,
  lastName,
  profilePicture,
  description,
  rating,
  price,
}) => {
  const dispatch = useDispatch();
  let scheduler;

  const handleClick = () => {
    if (!user) {
      alert("Please login to book an appointment");
    }
    handleClickOpen();
  };
  const [open, setOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    dispatch(clearAppointmentsList());
    setOpen(false);
  };

  return (
    <>
      <Card onClick={handleClick}>
        <CardMedia
          component="img"
          height="120px"
          width="100%"
          image={
            profilePicture ||
            "https://i.ibb.co/9tCfDKv/defaultprofilepicture.png"
          }
          alt="profile picture"
        />
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography
            component="span"
            variant="h6"
            color="text.primary"
            sx={{ width: 250 }}
          >
            {firstName} {lastName}
          </Typography>

          <Typography component="div" variant="body1" color="text.secondary">
            {description || (
              <Box sx={{ fontStyle: "italic" }}>
                Service description pending
              </Box>
            )}
          </Typography>

          <Typography variant="body2" color="text.secondary" component="div">
            {rating && `Rating: ${rating}`}
            {!rating && "-"}
          </Typography>

          <Typography variant="body2" color="text.secondary" component="div">
            Price per hour: ${price}
          </Typography>
        </CardContent>
      </Card>

      <DialogPopUp onClose={handleClose} open={open}>
        <Grid
          container
          spacing={4}
          sx={{ display: "flex", flexDirection: "row" }}
        >
          <Grid item md={2} mt="92px" sx={{ padding: 0 }}>
            <CardMedia
              component="img"
              height="120px"
              width="100%"
              image={
                profilePicture ||
                "https://i.ibb.co/9tCfDKv/defaultprofilepicture.png"
              }
              sx={{
                marginLeft: "20px",
                marginTop: "20px",
                marginBottom: "10px",
              }}
              alt="profile picture"
            />
            <Typography
              component="span"
              variant="h6"
              color="text.primary"
              sx={{ width: 250, marginLeft: "20px" }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography
              component="div"
              variant="body1"
              color="text.secondary"
              mt="20px"
              ml="20px"
              sx={{
                fontStyle: "italic",
              }}
            >
              {description || <Box>Service description pending</Box>}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              component="div"
              mt="20px"
              ml="20px"
            >
              {rating && `Rating: ${rating}`}
              {!rating && "-"}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              component="div"
              mt="20px"
              ml="20px"
            >
              Price per hour: ${price}
            </Typography>
          </Grid>
          <Grid item md={10} sx={{ padding: 0 }}>
            <Scheduler selectable consultantId={consultantId} />
          </Grid>
        </Grid>
      </DialogPopUp>
    </>
  );
};

export default CategoryCard;
