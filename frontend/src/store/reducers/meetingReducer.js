import { createSlice } from "@reduxjs/toolkit";

const meetingState = {
  meetingId: "",
};

const meetingSlice = createSlice({
  name: "meeting",
  initialState: meetingState,

  reducers: {
    updateMeetingId: (state, action) => {
      state.meetingId = action.payload;
    },
  },
});

export default meetingSlice.reducer;
export const { updateMeetingId } = meetingSlice.actions;
