import React from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { useDispatch, useSelector } from "react-redux";
import { closeAlertMessage } from "../../store/reducers/alertReducer";
export const AlertNotification = () => {
  const dispatch = useDispatch();
  const { showNotification, alertMessageContent } = useSelector(
    (state) => state.alert
  );
  function handleClose() {
    dispatch(closeAlertMessage());
  }
  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: "center", horizontal: "center" }}
        open={showNotification}
        onClose={handleClose}
        autoHideDuration={6000}
      >
        <Alert severity="warning">{alertMessageContent}</Alert>
      </Snackbar>
    </div>
  );
};
