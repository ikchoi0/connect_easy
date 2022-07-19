import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Avatar, Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useHistory } from "react-router-dom";
import { updateSelectedCategory } from "../../store/reducers/categoryReducer";
import { useDispatch } from "react-redux";

const HomePageCard = ({ name, description, pictureUrl }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const handleClick = () => {
    dispatch(updateSelectedCategory(name));
    history.push("/category");
  };
  return (
    <Grid item xs={12} sm={6}>
      <Card
        elevation={4}
        sx={{ display: "flex", height: 150, cursor: "pointer" }}
        onClick={handleClick}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography
              component="div"
              variant="h5"
              sx={{ width: 250 }}
            ></Typography>
            <Typography
              variant="subtitle1"
              color="text.primary"
              component="div"
            >
              {name}
            </Typography>
            <Box
              color="text.secondary"
              sx={{ display: "flex", justifyContent: "flex-start" }}
            >
              {description}
            </Box>
          </CardContent>
          <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
            <Button sx={{ marginLeft: "8px" }}>Learn More</Button>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "80%",
            justifyContent: "center",
          }}
        >
          <Avatar
            variant={"rounded"}
            alt="Avatar image"
            src={pictureUrl}
            style={{
              width: 100,
              height: 100,
            }}
          />
        </Box>
      </Card>
    </Grid>
  );
};

export default HomePageCard;
