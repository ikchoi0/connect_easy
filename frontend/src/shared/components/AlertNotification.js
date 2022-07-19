import React from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { useDispatch, useSelector } from "react-redux";
import { closeAlertMessage } from "../../store/reducers/alertReducer";
import { Typography } from "@mui/material";
export const AlertNotification = () => {
  const dispatch = useDispatch();
  const { showNotification, alertMessageContent, severityWarning } =
    useSelector((state) => state.alert);
  function handleClose() {
    dispatch(closeAlertMessage());
  }
  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={showNotification}
        onClose={handleClose}
        autoHideDuration={6000}
      >
        <Alert severity={severityWarning}>
          <Typography fontSize={"1.2rem"}>{alertMessageContent}</Typography>
        </Alert>
      </Snackbar>
    </div>
  );
};
