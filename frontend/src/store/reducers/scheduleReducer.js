import { createSlice, createAsyncThunk  } from '@reduxjs/toolkit'
import * as api from '../../api'

const schedulerState = {
  openingAppoinmentsList: []

}

export const createOpenAppointments = createAsyncThunk(
  'schedule/createOpenAppointments',
  async (openAppointmentsList, thunkApi)=>{
    const response = await api.setOpenAppointments(openAppointmentsList)
    console.log("data that goes to BE", openAppointmentsList)
    console.log('CREATE OPEN APPOINTMENT THUNK', response)
    if (response.error) return thunkApi.rejectWithValue(response.message);

    return response.data;
  }
)

const schedulerSlice = createSlice({
  name: 'scheduler',
  initialState: schedulerState,
  reducers:{
    setOneAppointment: (state, action) => {
      console.log("new appointment: ", action.payload)
      state.openingAppoinmentsList.push(action.payload)
    }
  },
  extraReducers: {
    [createOpenAppointments.fulfilled]: (state, action) => {
      console.log("create fulfilled", action.payload)
    },
    [createOpenAppointments.rejected]: (state, action) => {
      console.log("create rejected", action.payload)
    },

  }
})

export const { setOneAppointment} = schedulerSlice.actions;
export default schedulerSlice.reducer