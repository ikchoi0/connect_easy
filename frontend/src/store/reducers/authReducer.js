import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { showAlertMessage, showSuccessMessage } from "./alertReducer";

import * as api from "../../api";

const authState = {
  userDetails: null,
  isLoggedIn: false,
  isTokenValid: null,
  activeMeetingId: "",
};

export const getMe = createAsyncThunk("auth/getMe", async (_, thunkApi) => {
  const response = await api.getMe();
  if (response.error) {
    thunkApi.dispatch(showAlertMessage(response.message));
    return thunkApi.rejectWithValue(response);
  }
  return response.data;
});

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ userDetails, history }, thunkApi) => {
    const response = await api.resetPassword(userDetails);
    if (response.error) {
      thunkApi.dispatch(showAlertMessage(response.message));
      return thunkApi.rejectWithValue(response);
    }

    thunkApi.dispatch(showSuccessMessage(response.data));
    return response.data;
  }
);
export const resetPasswordLink = createAsyncThunk(
  "auth/resetPasswordLink",
  async ({ userDetails }, thunkApi) => {
    const response = await api.resetPasswordLink(userDetails);
    if (response.error) {
      thunkApi.dispatch(showAlertMessage(response.message));
      return thunkApi.rejectWithValue(response);
    }
    thunkApi.dispatch(showSuccessMessage(response.data));
    return response.data;
  }
);

export const checkTokenForPasswordReset = createAsyncThunk(
  "auth/checkTokenForPasswordReset",
  async (userDetails, thunkApi) => {
    const response = await api.checkTokenForPasswordReset(userDetails);
    if (response.error) {
      // token is invalid or has expired, redirect to login page
      return thunkApi.rejectWithValue(response);
    }
    return response.data;
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ userDetails }, thunkApi) => {
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
    [getMe.fulfilled]: (state, action) => {
      const activeMeetingId =
        action.payload.userDetails.options.activeMeetingId;
      if (activeMeetingId) {
        localStorage.setItem("activeMeeting", JSON.stringify(activeMeetingId));
        state.activeMeetingId = activeMeetingId;
      }
    },

    [register.fulfilled]: (state, action) => {
      state.userDetails = action.payload.userDetails;
      state.isLoggedIn = true;
    },
    [register.rejected]: (state, _) => {
      state.isLoggedIn = false;
    },
    [login.fulfilled]: (state, action) => {
      state.userDetails = action.payload.userDetails;
      state.isLoggedIn = true;
    },
    [login.rejected]: (state, action) => {
      state.isLoggedIn = false;
    },
    [resetPasswordLink.fulfilled]: (state, action) => {},
    [resetPasswordLink.rejected]: (state, action) => {},
    [resetPassword.fulfilled]: (state, action) => {
      alert("Password has been reset. Please log in with your new password.");
      window.location.href = "/login";
    },
    [resetPassword.rejected]: (state, action) => {},
    [checkTokenForPasswordReset.fulfilled]: (state, action) => {
      state.isTokenValid = true;
    },
    [checkTokenForPasswordReset.rejected]: (state, action) => {
      alert(
        "Token is invalid. Please try again with the valid token to reset password."
      );
      window.location.href = "/login";
      state.isTokenValid = false;
    },
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
