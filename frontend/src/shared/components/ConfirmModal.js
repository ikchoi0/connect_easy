import { Button } from '@mui/material';
import React from 'react';

function ConfirmModal({ onConfirm }) {
  return (
    <>
      <Button variant="contained" color="primary" onClick={onConfirm}>
        Confirm
      </Button>
    </>
  );
}

export default ConfirmModal;
