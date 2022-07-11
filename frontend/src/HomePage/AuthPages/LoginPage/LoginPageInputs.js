import React from "react";
import Grid from "@mui/material/Grid";
import TextFieldWithLabel from "../../../shared/components/TextFieldWithLabel";

function LoginPageInputs({ email, setEmail, password, setPassword }) {
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
      <Grid item xs={12}>
        <TextFieldWithLabel
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          value={password}
          setValue={setPassword}
          autoComplete="current-password"
        />
      </Grid>
    </Grid>
  );
}

export default LoginPageInputs;
