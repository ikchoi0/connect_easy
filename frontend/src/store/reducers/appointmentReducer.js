import { createSlice } from "@reduxjs/toolkit";

const appointmentState = {
  selectedStatusFilter: "Upcoming",
};

const appointmentSlice = createSlice({
  name: "appointment",
  initialState: appointmentState,
  reducers: {
    updateSelectedStatusFilter: (state, action) => {
      console.log("ACTION PAYLOAD:::", action.payload)
      state.selectedStatusFilter = action.payload;

    },
  },
});

export default appointmentSlice.reducer;
export const { updateSelectedStatusFilter } = appointmentSlice.actions;
