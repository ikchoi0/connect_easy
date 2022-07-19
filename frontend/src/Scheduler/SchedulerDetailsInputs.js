import React from "react";
import TextFieldWithLabel from "../shared/components/TextFieldWithLabel";

const SchedulerDetailsInputs = ({ description, setDescription }) => {
  return (
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
  );
};

export default SchedulerDetailsInputs;
