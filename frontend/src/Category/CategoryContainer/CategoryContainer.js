import React, { useEffect } from "react";
import { Box, Container, Typography } from "@mui/material";
import ConsultantCard from "../ConsultantCard/ConsultantCard";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import { getUsersWithinCategory } from "../../store/reducers/categoryReducer";
import { useHistory } from "react-router-dom";

export default function CategoryContainer() {
  const history = useHistory();
  const dispatch = useDispatch();
  const category = useSelector((state) => state.category);

  useEffect(() => {
    if (category.selectedCategory === null) {
      history.push("/");
    } else {
      dispatch(getUsersWithinCategory(category.selectedCategory));
    }
  }, []);

  const consultantCards =
    category &&
    category.usersWithinCategory.map((consultant, index) => {
      return (
        <Grid item key={index} xs={12} sm={6} lg={4}>
          <ConsultantCard
            key={consultant._id}
            consultantId={consultant._id}
            firstName={consultant.firstName}
            lastName={consultant.lastName}
            profilePicture={
              consultant.options && consultant.options.profilePicture
            }
            description={consultant.options && consultant.options.description}
            rating={consultant.options && consultant.options.rating}
            price={consultant.options && consultant.options.price}
          />
        </Grid>
      );
    });

  return (
    <Container maxWidth="lg" color="primary.main">
      <Typography variant="h3" align="center" mt={5} color="#36454F">
        {category && category.selectedCategory}
      </Typography>
      <Box
        sx={{
          marginTop: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          textTransform: "none",
          position: "relative",
          borderRadius: "5px",
          padding: "20px",
        }}
      >
        <Grid container spacing={3} display="flex">
          {consultantCards}
        </Grid>
      </Box>
    </Container>
  );
}
