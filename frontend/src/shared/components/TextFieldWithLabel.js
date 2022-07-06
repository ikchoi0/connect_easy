import React from "react";
import TextField from "@mui/material/TextField";

const TextFieldWithLabel = ({
  id,
  label,
  autoComplete,
  autoFocus = false,
  value,
  setValue,
  type = "",
}) => {
  const handleValueChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <TextField
      id={id}
      name={id}
      label={label}
      autoComplete={autoComplete}
      required
      fullWidth
      autoFocus={autoFocus}
      type={type}
      value={value}
      onChange={handleValueChange}
    />
  );
};

export default TextFieldWithLabel;
