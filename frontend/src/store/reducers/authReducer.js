import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import * as api from '../../api';

const authState = {
  userDetails: null,
  isLoggedIn: false,
};

export const login = createAsyncThunk(
  'auth/login',
  async ({ userDetails }, thunkApi) => {
    const response = await api.login(userDetails);

    if (response.error) return thunkApi.rejectWithValue(response.message);

    return response.data;
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async ({ userDetails }, thunkApi) => {
    const response = await api.register(userDetails);

    if (response.error) return thunkApi.rejectWithValue(response.message);

    return response.data;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: authState,
  reducers: {
    setUser: (state, action) => {
      state.userDetails = action.payload;
      state.isLoggedIn = true;
    },
  },
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      state.userDetails = action.payload.userDetails;
      state.isLoggedIn = true;
    },
    [register.rejected]: (state, _) => {
      // handle rejected
      state.isLoggedIn = false;
    },
    [login.fulfilled]: (state, action) => {
      state.userDetails = action.payload.userDetails;
      state.isLoggedIn = true;
    },
    [login.rejected]: (state, _) => {
      // handle rejected
      state.isLoggedIn = false;
    },
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
