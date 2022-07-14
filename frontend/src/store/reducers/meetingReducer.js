import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api";
import { showAlertMessage } from "./alertReducer";

const meetingState = {
  meetingId: "",
};

export const updateVideoStatusActive = createAsyncThunk(
  "schedule/updateVideoStatusActive",
  async ({ appointmentData, history }, thunkApi) => {
    // console.log(appointmentData);
    const response = await api.updateVideoStatusActive(appointmentData);
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
    [updateVideoStatusActive.fulfilled]: (state, action) => {
      console.log(action.payload);
      console.log("updateVideoStartTime fulfilled");
    },
    [updateVideoStatusActive.rejected]: (state, action) => {
      console.log("updateVideoStartTime rejected");
    },
  },
});

export default meetingSlice.reducer;
export const { updateMeetingId } = meetingSlice.actions;
