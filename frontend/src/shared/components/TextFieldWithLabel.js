import React from 'react';
import TextField from '@mui/material/TextField';
import { FormControl } from '@mui/material';

const TextFieldWithLabel = ({
  id,
  label,
  autoComplete,
  autoFocus = false,
  value,
  setValue,
  type = '',
}) => {
  const handleValueChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <FormControl fullWidth>
      <TextField
        id={id}
        name={id}
        label={label}
        required
        // fullWidth
        autoFocus={autoFocus}
        type={type}
        value={value}
        onChange={handleValueChange}
      />
    </FormControl>
  );
};

export default TextFieldWithLabel;
