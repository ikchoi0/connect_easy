import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import HomePageCard from "./HomePageCard";
import { category } from "../../store/reducers/categoryReducer";
import { useHistory } from "react-router-dom";
export default function HomePageBody() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { categoryList, isLoading } = useSelector((state) => state.category);
  const theme = useTheme();
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
    <Container sx={{ py: 8 }} maxWidth="md">
      {/* End hero unit */}
      <Grid container spacing={4}>
        {categoryCards}
      </Grid>
    </Container>
  );
}
