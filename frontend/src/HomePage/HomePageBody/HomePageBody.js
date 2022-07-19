import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { useDispatch, useSelector } from "react-redux";
import HomePageCard from "./HomePageCard";
import { category } from "../../store/reducers/categoryReducer";

export default function HomePageBody() {
  const dispatch = useDispatch();
  const { categoryList, isLoading } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(category());
  }, []);

  let categoryCards;

  if (!isLoading) {
    categoryCards = categoryList.map((category) => {
      return <HomePageCard key={category.name} {...category} />;
    });
  }
  return (
    <Container sx={{ py: 8 }} maxWidth="lg">
      <Grid container spacing={4}>
        {categoryCards}
      </Grid>
    </Container>
  );
}
