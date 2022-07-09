import React from "react";
import TextFieldWithLabel from "../shared/components/TextFieldWithLabel";
import Grid from "@mui/material/Grid";
const SchedulerDetailsInputs = ({ description, setDescription }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextFieldWithLabel
          required
          fullWidth
          name="description"
          label="Description"
          type="description"
          id="description"
          value={description}
          setValue={setDescription}
          autoComplete="current-password"
        />
      </Grid>
    </Grid>
  );
};

export default SchedulerDetailsInputs;
