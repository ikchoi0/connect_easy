import React from 'react';

import Dialog from '@mui/material/Dialog';

const DialogPopUp = ({ open, onClose, children }) => {
  return (
    <Dialog
      fullWidth={true}
      maxWidth="xl"
      open={open}
      onClose={onClose}
      aria-labelledby="responsive-dialog-title"
    >
      {children}
    </Dialog>
  );
};

export default DialogPopUp;
