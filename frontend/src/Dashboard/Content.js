import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Card, Container } from "@mui/material";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";

export default function Content() {
  return (
    <Container sx={{ py: 8 }} maxWidth="md">
      {/* End hero unit */}
      <Card sx={{ margin: 2, overflow: "hidden" }}>
        <AppBar
          position="static"
          color="default"
          elevation={0}
          sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
        >
          <Toolbar>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <SearchIcon color="inherit" sx={{ display: "block" }} />
              </Grid>
              <Grid item xs>
                <TextField
                  fullWidth
                  placeholder="Search by email address, phone number, or user UID"
                  InputProps={{
                    disableUnderline: true,
                    sx: { fontSize: "default" },
                  }}
                  variant="standard"
                />
              </Grid>
              <Grid item>
                <Button variant="contained" sx={{ mr: 1 }}>
                  Add user
                </Button>
                <Tooltip title="Reload">
                  <IconButton>
                    <RefreshIcon color="inherit" sx={{ display: "block" }} />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="center">
          consultant schedule{" "}
        </Typography>
      </Card>
      {/* Map cards below using consultant appointment data */}
      <Card sx={{ margin: 2 }}>
        <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="center">
          consultant schedule
        </Typography>
      </Card>
      <Card sx={{ margin: 2 }}>
        <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="center">
          consultant schedule
        </Typography>
      </Card>{" "}
      <Card sx={{ margin: 2 }}>
        <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="center">
          consultant schedule
        </Typography>
      </Card>{" "}
      <Card sx={{ margin: 2 }}>
        <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="center">
          consultant schedule
        </Typography>
      </Card>
    </Container>
  );
}
