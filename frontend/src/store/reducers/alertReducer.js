import { createSlice } from "@reduxjs/toolkit";

const alertState = {
  showNotification: false,
  alertMessageContent: null,
};

const alertSlice = createSlice({
  name: "alertNotification",
  initialState: alertState,
  reducers: {
    showAlertMessage: (state, action) => {
      state.showNotification = true;
      state.alertMessageContent = action.payload;
    },
    closeAlertMessage: (state, action) => {
      state.showNotification = false;
      state.alertMessageContent = null;
    },
  },
});

export default alertSlice.reducer;
export const { showAlertMessage, closeAlertMessage } = alertSlice.actions;
