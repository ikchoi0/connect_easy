import React from "react";
import Grid from "@mui/material/Grid";
import TextFieldWithLabel from "../../../shared/components/TextFieldWithLabel";

function PasswordResetPageInputs({ email, setEmail }) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextFieldWithLabel
          id="email"
          label="Email Address"
          value={email}
          setValue={setEmail}
          autoFocus={true}
          autoComplete="email"
        />
      </Grid>
    </Grid>
  );
}

export default PasswordResetPageInputs;
