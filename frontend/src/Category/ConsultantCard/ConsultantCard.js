import React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Scheduler from "../../Scheduler/Scheduler";
import DialogPopUp from "../../shared/components/DialogPopUp";
import { useDispatch } from "react-redux";
import { clearAppointmentsList } from "../../store/reducers/scheduleReducer";
import { Grid } from "@mui/material";
import ConsultantName from "./ConsultantName";
import ConsultantPicture from "./ConsultantPicture";
import ConsultantDescription from "./ConsultantDescription";
import ConsultantPrice from "./ConsultantPrice";

const CategoryCard = ({
  consultantId,
  firstName,
  lastName,
  profilePicture,
  description,
  price,
}) => {
  const dispatch = useDispatch();
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
        <ConsultantPicture profilePicture={profilePicture} />
        <CardContent sx={{ flex: "1 0 auto" }}>
          <ConsultantName firstName={firstName} lastName={lastName} />
          <Box
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: "1",
              WebkitBoxOrient: "vertical",
            }}
          >
            <ConsultantDescription description={description} />
          </Box>
          <ConsultantPrice price={price} />
        </CardContent>
      </Card>

      <DialogPopUp onClose={handleClose} open={open}>
        <Grid
          container
          spacing={4}
          sx={{ display: "flex", flexDirection: "row" }}
        >
          <Grid item md={2} mt="91px">
            <Box
              sx={{
                marginLeft: "20px",
                marginTop: "20px",
              }}
            >
              <ConsultantPicture profilePicture={profilePicture} />

              <ConsultantName firstName={firstName} lastName={lastName} />

              <Box
                sx={{
                  marginBottom: "20px",
                  marginTop: "20px",
                  fontStyle: "italic",
                }}
              >
                <ConsultantDescription description={description} />
              </Box>
              <ConsultantPrice price={price} />
            </Box>
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
