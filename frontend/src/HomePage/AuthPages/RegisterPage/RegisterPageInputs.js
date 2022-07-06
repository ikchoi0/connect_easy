import React from "react";
import Grid from "@mui/material/Grid";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TextFieldWithLabel from "../../../shared/components/TextFieldWithLabel";
const RegisterPageInputs = ({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
  password,
  setPassword,
  consultantCheck,
  setConsultantCheck,
}) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextFieldWithLabel
          id="firstName"
          label="First Name"
          autoComplete="given-name"
          autoFocus={true}
          value={firstName}
          setValue={setFirstName}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextFieldWithLabel
          id="lastName"
          label="Last Name"
          autoComplete="family-name"
          value={lastName}
          setValue={setLastName}
        />
      </Grid>
      <Grid item xs={12}>
        <TextFieldWithLabel
          id="email"
          label="Email Address"
          autoComplete="email"
          value={email}
          setValue={setEmail}
        />
      </Grid>
      <Grid item xs={12}>
        <TextFieldWithLabel
          id="password"
          label="Password"
          type="password"
          autoComplete="new-password"
          value={password}
          setValue={setPassword}
        />
      </Grid>
      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Checkbox
              checked={consultantCheck}
              onChange={(e) => setConsultantCheck(e.target.checked)}
              value="allowExtraEmails"
              color="primary"
            />
          }
          label="Consultant?"
        />
      </Grid>
    </Grid>
  );
};

export default RegisterPageInputs;
