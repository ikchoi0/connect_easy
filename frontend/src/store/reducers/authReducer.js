import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { showAlertMessage, showSuccessMessage } from "./alertReducer";
import * as api from "../../api";

const authState = {
  userDetails: null,
  isLoggedIn: false,
};

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ userDetails }, thunkApi) => {
    const response = await api.resetPassword(userDetails);
    if (response.error) {
      thunkApi.dispatch(showAlertMessage(response.message));
      return thunkApi.rejectWithValue(response);
    }
    thunkApi.dispatch(showSuccessMessage(response.data));
    return response.data;
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ userDetails, history }, thunkApi) => {
    const response = await api.login(userDetails, thunkApi.dispatch);

    if (response.error) {
      thunkApi.dispatch(showAlertMessage(response.message));
      return thunkApi.rejectWithValue(response.message);
    }
    return response.data;
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async ({ userDetails, dispatch }, thunkApi) => {
    const response = await api.register(userDetails, dispatch);

    if (response.error) {
      thunkApi.dispatch(showAlertMessage(response.message));
      return thunkApi.rejectWithValue(response.message);
    }

    return response.data;
  }
);

const authSlice = createSlice({
  name: "auth",
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
    [login.rejected]: (state, action) => {
      // handle rejected
      state.isLoggedIn = false;
    },
    [resetPassword.fulfilled]: (state, action) => {},
    [resetPassword.rejected]: (state, action) => {
      // handle rejected
    },
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
