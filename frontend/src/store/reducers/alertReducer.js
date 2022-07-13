import { createSlice } from "@reduxjs/toolkit";

const alertState = {
  showNotification: false,
  alertMessageContent: null,
  severityWarning: "success",
};

const alertSlice = createSlice({
  name: "alertNotification",
  initialState: alertState,
  reducers: {
    showAlertMessage: (state, action) => {
      state.showNotification = true;
      state.alertMessageContent = action.payload;
      state.severityWarning = "error";
    },
    showSuccessMessage: (state, action) => {
      state.showNotification = true;
      state.alertMessageContent = action.payload;
      state.severityWarning = "success";
    },
    closeAlertMessage: (state, action) => {
      state.showNotification = false;
      state.alertMessageContent = null;
      state.severityWarning = "success";
    },
  },
});

export default alertSlice.reducer;
export const { showAlertMessage, closeAlertMessage, showSuccessMessage } =
  alertSlice.actions;
