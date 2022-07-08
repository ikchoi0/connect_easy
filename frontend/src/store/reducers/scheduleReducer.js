import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api";

const schedulerState = {
  openingAppointmentsList: [],
  appointments: null,
};

export const createOpenAppointments = createAsyncThunk(
  "schedule/createOpenAppointments",
  async (openAppointmentsList, thunkApi) => {
    const response = await api.setOpenAppointments(openAppointmentsList);
    if (response.error) return thunkApi.rejectWithValue(response.message);
    return response.data;
  }
);

export const getAppointmentsForConsultant = createAsyncThunk(
  "schedule/getAppointments",
  async (thunkApi) => {
    const response = await api.getAppointmentsForConsultant();
    console.log("GET APPOINTMENT THUNK", response);
    if (response.error) return thunkApi.rejectWithValue(response.message);

    return response.data;
  }
);

const schedulerSlice = createSlice({
  name: "scheduler",
  initialState: schedulerState,

  reducers: {
    setOneAppointment: (state, action) => {
      state.openingAppointmentsList.push(action.payload);
    },
  },
  extraReducers: {
    [createOpenAppointments.fulfilled]: (state, action) => {
      console.log("create fulfilled", action.payload);
    },
    [createOpenAppointments.rejected]: (state, action) => {
      console.log("create rejected", action.payload);
    },
    [getAppointmentsForConsultant.fulfilled]: (state, action) => {
      state.appointments = action.payload;
      console.log("get fulfilled", action.payload);
    },
    [getAppointmentsForConsultant.rejected]: (state, action) => {
      console.log("get rejected", action.payload);
    },
  },
});

export const { setOneAppointment } = schedulerSlice.actions;
export default schedulerSlice.reducer;
