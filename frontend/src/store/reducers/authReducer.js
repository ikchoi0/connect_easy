import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const authState = {
  userDetails: null,
  isLoggedIn: false,
  name: '',
};

export const login = createAsyncThunk(
  'auth/login',
  async (userDetails, thunkApi) => {
    try {
      const response = await axios.post(
        'http://localhost:5002/api/auth/login',
        userDetails
      );

      if (response.data) thunkApi.dispatch(setUserLoggedIn(response.data));
    } catch (error) {
      console.log(error);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: authState,
  reducers: {
    setUserLoggedIn(state, action) {
      // console.log(action.payload);
      state.userDetails = action.payload;
      state.isLoggedIn = true;
    },
  },
});

export const { setUserLoggedIn } = authSlice.actions;

export default authSlice.reducer;
