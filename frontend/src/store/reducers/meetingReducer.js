import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api";
import { showAlertMessage } from "./alertReducer";

const meetingState = {
  meetingId: "",
};

export const updateAppointmentVideoStartTime = createAsyncThunk(
  "schedule/updateVideoStartTime",
  async ({ appointmentData, history }, thunkApi) => {
    // console.log(appointmentData);
    const response = await api.updateAppointmentVideoStartTime(appointmentData);
    if (response.error) {
      thunkApi.dispatch(showAlertMessage(response.message));
      return thunkApi.rejectWithValue(response);
    } else {
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
    [updateAppointmentVideoStartTime.fulfilled]: (state, action) => {
      console.log(action.payload);
      console.log("updateVideoStartTime fulfilled");
    },
    [updateAppointmentVideoStartTime.rejected]: (state, action) => {
      console.log("updateVideoStartTime rejected");
    },
  },
});

export default meetingSlice.reducer;
export const { updateMeetingId } = meetingSlice.actions;
