import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api";
import { showAlertMessage, showSuccessMessage } from "./alertReducer";

const meetingState = {
  meetingId: "",
  appointmentData: null,
  conversations: [],
};

export const getPastMessages = createAsyncThunk(
  "meeting/getPastMessages",
  async (meetingId, thunkApi) => {
    const response = await api.getPastMessages(meetingId);
    if (response.error) {
      thunkApi.dispatch(showAlertMessage(response.message));
      return thunkApi.rejectWithValue(response.message);
    }
    return response.data;
  }
);

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
    const response = await api.postEndMeeting(appointmentData);
    if (response.error) {
      thunkApi.dispatch(showAlertMessage(response.data.message));
      return thunkApi.rejectWithValue(response);
    } else {
      thunkApi.dispatch(showSuccessMessage("Thank you! Meeting ended"));
      return response.data;
    }
  }
);

export const getAppointmentByAppointmentId = createAsyncThunk(
  "schedule/getAppointmentByAppointmentId",
  async (appointmentData, thunkApi) => {
    const response = await api.getAppointmentByAppointmentId(appointmentData);
    if (response.error) {
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
    [postStartMeeting.fulfilled]: (state, action) => {},
    [postStartMeeting.rejected]: (state, action) => {},
    [postEndMeeting.fulfilled]: (state, action) => {},
    [postEndMeeting.rejected]: (state, action) => {},
    [getAppointmentByAppointmentId.fulfilled]: (state, action) => {
      state.appointmentData = action.payload;
    },
    [getAppointmentByAppointmentId.rejected]: (state, action) => {},
    [getPastMessages.fulfilled]: (state, action) => {
      state.conversations = action.payload;
    },
  },
});

export default meetingSlice.reducer;
export const { updateMeetingId } = meetingSlice.actions;
