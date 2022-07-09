import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import Scheduler from "../../Scheduler/Scheduler";
const DialogPopUp = ({ open, onClose, children }) => {
  return (
    <Dialog
      fullWidth={true}
      maxWidth="md"
      open={open}
      onClose={onClose}
      aria-labelledby="responsive-dialog-title"
    >
      {children}
    </Dialog>
  );
};

export default DialogPopUp;
