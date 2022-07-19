import React from "react";
import Grid from "@mui/material/Grid";
import TextFieldWithLabel from "../../../shared/components/TextFieldWithLabel";
import { Stack } from "@mui/material";

function PasswordResetPageInputs({
  password1,
  setPassword1,
  password2,
  setPassword2,
}) {
  return (
    <Stack spacing={2}>
      <Grid item xs={6}>
        <TextFieldWithLabel
          id="password1"
          label="Password"
          value={password1}
          setValue={setPassword1}
          autoFocus={true}
          autoComplete="password"
          type="password"
        />
      </Grid>
      <Grid item xs={6}>
        <TextFieldWithLabel
          id="password2"
          label="Re-enter Password"
          value={password2}
          setValue={setPassword2}
          autoComplete="password"
          type="password"
        />
      </Grid>
    </Stack>
  );
}

export default PasswordResetPageInputs;
