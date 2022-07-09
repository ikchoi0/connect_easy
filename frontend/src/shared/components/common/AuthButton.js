import { Button } from '@mui/material';
import React from 'react';

function AuthButton({ name, onClick }) {
  return <Button onClick={onClick}>{name}</Button>;
}

export default AuthButton;
