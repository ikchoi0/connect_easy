import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api";
import { showAlertMessage, showSuccessMessage } from "./alertReducer";

const meetingState = {
  meetingId: "",
};

// updates video start time in appointment table
// updates hasActiveMeeting, activeMeetingId in user table
export const postStartMeeting = createAsyncThunk(
  "schedule/postStartMeeting",
  async ({ appointmentData, history }, thunkApi) => {
    // pass the appointmentData, userId
    const response = await api.postStartMeeting(appointmentData);
    if (response.error) {
      thunkApi.dispatch(showAlertMessage(response.data.message));
      return thunkApi.rejectWithValue(response);
    } else {
      thunkApi.dispatch(
        showSuccessMessage("Your are now connected to the meeting")
      );
      return response.data;
    }
  }
);
// updates video end time in appointment table
// updates hasActiveMeeting, activeMeetingId in user table
export const postEndMeeting = createAsyncThunk(
  "schedule/postEndMeeting",
  async (appointmentData, thunkApi) => {
    // pass appointmentId to backend
    console.log("postEndMeeting", appointmentData);
    const response = await api.postEndMeeting(appointmentData);
    if (response.error) {
      thunkApi.dispatch(showAlertMessage(response.data.message));
      return thunkApi.rejectWithValue(response);
    } else {
      console.log(response);
      thunkApi.dispatch(showSuccessMessage("Thank you! Meeting ended"));
      return response.data;
    }
  }
);

const meetingSlice = createSlice({
  name: "meeting",
  initialState: meetingState,

  reducers: {
    updateMeetingId: (state, action) => {
      state.meetingId = action.payload;
    },
  },
  extraReducers: {
    [postStartMeeting.fulfilled]: (state, action) => {
      // console.log(action.payload);
      console.log("Meeting started successfully.");
    },
    [postStartMeeting.rejected]: (state, action) => {
      console.log("postStartMeeting rejected");
    },
    [postEndMeeting.fulfilled]: (state, action) => {
      // console.log(action.payload);
      console.log("Meeting ended successfully.");
    },
    [postEndMeeting.rejected]: (state, action) => {
      console.log("postEndMeeting rejected");
    },
  },
});

export default meetingSlice.reducer;
export const { updateMeetingId } = meetingSlice.actions;
