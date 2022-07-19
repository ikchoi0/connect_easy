import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../api';
import { showAlertMessage, showSuccessMessage } from './alertReducer';
import { io } from 'socket.io-client';

// const socket = io('http://localhost:5002');
const socket = io('https://connect-easy-rid.herokuapp.com');

const schedulerState = {
  openingAppointmentsList: [],
  appointments: [],
  appointmentsForSelectedDate: [],
  booked: false,
};

export const createOpenAppointments = createAsyncThunk(
  'schedule/createOpenAppointments',
  async (openAppointmentsList, thunkApi) => {
    const response = await api.setOpenAppointments(openAppointmentsList);
    if (response.error) {
      thunkApi.dispatch(showAlertMessage(response.message));
      return thunkApi.rejectWithValue(response.message);
    }
    thunkApi.dispatch(
      showSuccessMessage('New appointments saved successfully')
    );
    return response.data;
  }
);

export const getAllAppointments = createAsyncThunk(
  'schedule/getAppointments',
  async (consultantId, thunkApi) => {
    const response = await api.getAllAppointments(consultantId);

    if (response.error) {
      thunkApi.dispatch(showAlertMessage(response.message));
      return thunkApi.rejectWithValue(response.message);
    }
    return response.data;
  }
);

// get appointments using client id
export const getAppointmentsForClientId = createAsyncThunk(
  'schedule/getAppointmentsForClientId',
  async (clientId, thunkApi) => {
    const response = await api.getAppointmentsForClientId(clientId);

    if (response.error) {
      thunkApi.dispatch(showAlertMessage(response.message));
      return thunkApi.rejectWithValue(response.message);
    }

    return response.data;
  }
);

export const getAppointmentsForTheDay = createAsyncThunk(
  'schedule/getAppointmentsForTheDay',
  async ({ consultantId, date }, thunkApi) => {
    const response = await api.getAppointmentsForConsultantsByDate(
      consultantId,
      date
    );

    if (response.error) {
      thunkApi.dispatch(showAlertMessage(response.message));
      return thunkApi.rejectWithValue(response.message);
    }

    return response.data;
  }
);

export const deleteOneAppointment = createAsyncThunk(
  'schedule/deleteOneAppointment',
  async (appointmentId, thunkApi) => {
    const response = await api.deleteOneAppointmentById(appointmentId);

    if (response.error) {
      thunkApi.dispatch(showAlertMessage(response.message));
      return thunkApi.rejectWithValue(response.message);
    }
    return response.data;
  }
);

export const bookAppointment = createAsyncThunk(
  'schedule/bookAppointment',
  async ({ appointmentData, history }, thunkApi) => {
    const response = await api.bookAppointment(appointmentData);

    if (response.error) {
      thunkApi.dispatch(showAlertMessage(response.message));
      return thunkApi.rejectWithValue(response.message);
    } else {
      history.push('/clientDashboard');
      return response.data;
    }
  }
);

export const appointmentBookingCancel = createAsyncThunk(
  'schedule/appointmentBookingCancel',
  async (appointmentId, thunkApi) => {
    const response = await api.cancelBookedAppointment({ appointmentId });

    if (response.error) {
      thunkApi.dispatch(showAlertMessage(response.message));
      return thunkApi.rejectWithValue(response.message);
    }

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
    clearAppointmentsList: (state) => {
      state.appointments = [];
    },
  },
  extraReducers: {
    [createOpenAppointments.fulfilled]: (state, action) => {
    },
    [createOpenAppointments.rejected]: (state, action) => {
    },
    [getAllAppointments.fulfilled]: (state, action) => {
      state.appointments = action.payload;
    },
    [getAllAppointments.rejected]: (state, action) => {
    },
    [deleteOneAppointment.fulfilled]: (state, action) => {
      state.appointments = state.appointments.filter((appointment) => {
        return appointment.appointmentId !== action.payload._id;
      });
    },
    [getAppointmentsForTheDay.fulfilled]: (state, action) => {
      state.appointmentsForSelectedDate = action.payload;
    },
    [bookAppointment.pending]: (state, action) => {
      state.booked = false;
    },
    [bookAppointment.fulfilled]: (state, action) => {
      state.booked = true;
      setTimeout(() => {
        socket.emit('appointment_booked', action.payload);
      }, 1000);
    },
    [bookAppointment.rejected]: (state, action) => {
    },
    [getAppointmentsForClientId.pending]: (state, action) => {
    },
    [getAppointmentsForClientId.fulfilled]: (state, action) => {
      state.appointments = action.payload;
    },
    [getAppointmentsForClientId.rejected]: (state, action) => {
    },
    [appointmentBookingCancel.fulfilled]: (state, action) => {
      state.appointments = state.appointments.filter((appointment) => {
        return appointment.appointmentId !== action.payload._id;
      });
    },
  },
});

export const {
  setOneAppointment,
  deleteOneOpeningAppointment,
  clearOpeningAppointmentsList,
  clearAppointmentsList,
} = schedulerSlice.actions;
export default schedulerSlice.reducer;
