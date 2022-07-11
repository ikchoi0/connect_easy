import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Copyright from "../../shared/components/Copyright";

function HomePageFooter(props) {
  return (
    <Box component="footer" sx={{ bgcolor: "background.paper", py: 6 }}>
      <Container maxWidth="lg">
        <Copyright />
      </Container>
    </Box>
  );
}

export default HomePageFooter;
