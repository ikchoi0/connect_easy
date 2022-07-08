import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../api';

const schedulerState = {
  openingAppointmentsList: [],
  appointments: [],
};

export const createOpenAppointments = createAsyncThunk(
  'schedule/createOpenAppointments',
  async (openAppointmentsList, thunkApi) => {
    const response = await api.setOpenAppointments(openAppointmentsList);
    if (response.error) return thunkApi.rejectWithValue(response.message);
    return response.data;
  }
);

export const getAppointmentsForConsultant = createAsyncThunk(
  'schedule/getAppointments',
  async (consultantId, thunkApi) => {
    const response = await api.getAppointmentsForConsultant(consultantId);

    if (response.error) return thunkApi.rejectWithValue(response.message);

    return response.data;
  }
);

export const getAppointmentsForTheDay = createAsyncThunk(
  'schedule/getAppointmentsForTheDay',
  async (date, thunkApi) => {
    const response = await api.getAppointmentsForConsultantsByDate(date);

    if (response.error) return thunkApi.rejectWithValue(response.message);

    return response.data;
  }
);

export const deleteOneAppointment = createAsyncThunk(
  'schedule/deleteOneAppointment',
  async (appointmentId, thunkApi) => {
    const response = await api.deleteOneAppointmentById(appointmentId);

    if (response.error) return thunkApi.rejectWithValue(response.message);

    return response.data;
  }
);

const schedulerSlice = createSlice({
  name: 'scheduler',
  initialState: schedulerState,

  reducers: {
    setOneAppointment: (state, action) => {
      state.openingAppointmentsList.push(action.payload);
    },
    deleteOneOpeningAppointment: (state, action) => {
      state.openingAppointmentsList = state.openingAppointmentsList.filter(
        (appointment) => appointment.key !== action.payload
      );
    },
    clearOpeningAppointmentsList: (state) => {
      state.openingAppointmentsList = [];
    },
  },
  extraReducers: {
    [createOpenAppointments.fulfilled]: (state, action) => {
      console.log('create fulfilled', action.payload);
    },
    [createOpenAppointments.rejected]: (state, action) => {
      console.log('create rejected', action.payload);
    },
    [getAppointmentsForConsultant.fulfilled]: (state, action) => {
      console.log('get appointments fulfilled', action.payload);
      state.appointments = action.payload;
    },
    [getAppointmentsForConsultant.rejected]: (state, action) => {
      console.log('get rejected', action.payload);
    },
    [deleteOneAppointment.fulfilled]: (state, action) => {
      state.appointments = state.appointments.filter((appointment) => {
        return appointment.appointmentId !== action.payload._id;
      });
    },
    [getAppointmentsForTheDay.fulfilled]: (state, action) => {
      console.log('get appointments for the day', action.payload);
    },
  },
});

export const {
  setOneAppointment,
  deleteOneOpeningAppointment,
  clearOpeningAppointmentsList,
} = schedulerSlice.actions;
export default schedulerSlice.reducer;
