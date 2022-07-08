import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import Scheduler from "../../Scheduler/Scheduler";
const DialogPopUp = ({
  acceptName,
  cancelName,
  open,
  onAccept,
  onCancel,
  onClose,
  children,
}) => {
  return (
    <Dialog
      fullWidth={true}
      maxWidth="md"
      open={open}
      onClose={onClose}
      aria-labelledby="responsive-dialog-title"
    >
      {children}
      <DialogActions>
        <Button autoFocus onClick={onCancel}>
          {cancelName}
        </Button>
        <Button onClick={onAccept} autoFocus>
          {acceptName}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogPopUp;
