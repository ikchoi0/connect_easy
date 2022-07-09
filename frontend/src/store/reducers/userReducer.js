import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api";

const appointmentState = {
  userInfo: {},
};

export const getUserById = createAsyncThunk(
  "appointment/getUserById",
  async (userId, thunkApi) => {
    const response = await api.getUserById(userId);
    if (response.error) return thunkApi.rejectWithValue(response.message);
    return response.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: appointmentState,

  reducers: {},
  extraReducers: {
    [getUserById.fulfilled]: (state, action) => {
      state = action.payload;
      console.log("retrieving user info fulfilled", action.payload);
    },
    [getUserById.rejected]: (state, action) => {
      console.log("retrieving user info rejected", action.payload);
    },
  },
});

export default userSlice.reducer;
