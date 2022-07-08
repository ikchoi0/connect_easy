import React, { useEffect } from "react";
import { Box, Container, Typography } from "@mui/material";
import ConsultantCard from "../ConsultantCard/ConsultantCard";
import { useTheme } from "@emotion/react";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import { getUsersWithinCategory } from "../../store/reducers/categoryReducer";

export default function CategoryContainer() {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getUsersWithinCategory(category.selectedCategory));
  }, []);

  const theme = useTheme();

  const consultantCards = category.usersWithinCategory.map(
    (consultant, index) => {
      return (
        <Grid item key={index} xs={12} sm={6} lg={4}>
          <ConsultantCard
            key={consultant.id}
            firstName={consultant.firstName}
            lastName={consultant.lastName}
            profilePicture={consultant.options.profilePicture}
            description={consultant.options.description}
            rating={consultant.options.rating}
            price={consultant.options.price}
          />
        </Grid>
      );
    }
  );
  return (
    <Container maxWidth="lg" color="primary.main">
      <Typography variant="h3" align="center" mt={5} color="#317773">
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
          backgroundColor: "#E2D1F9",
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
