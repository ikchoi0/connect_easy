import { createSlice, createAsyncThunk, isFulfilled } from "@reduxjs/toolkit";
import axios from "axios";

const authState = {
  userDetails: null,
  isLoggedIn: false,
  name: "",
};

export const login = createAsyncThunk(
  "auth/login",
  async (userDetails, thunkApi) => {
    try {
      const response = await axios.post(
        "http://localhost:5002/api/auth/login",
        userDetails
      );

      if (response.data) thunkApi.dispatch(setUserLoggedIn(response.data));
    } catch (error) {
      console.log(error);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async ({ userDetails, history }, thunkApi) => {
    const response = {
      error: false,
      data: "hello",
    };
    // await axios.post(
    //   "http://localhost:5002/api/auth/register",
    //   userDetails
    // );
    if (response.error) {
      // show error message in alert
      return new Error();
      console.log(response.error);
    } else {
      history.push("/");
      // thunkApi.dispatch(setUserLoggedIn(response.data));
      return userDetails;
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: authState,
  reducers: {
    setUserLoggedIn(state, action) {
      // console.log(action.payload);
      state.userDetails = action.payload;
      state.isLoggedIn = true;
    },
    // register: (state, { userDetails, history }) => {
    //   register({ userDetails, history });
    // },
  },
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      //
    },
    [register.rejected]: (state, action) => {
      // handle rejected
    },
  },
});

export const { setUserLoggedIn } = authSlice.actions;

export default authSlice.reducer;
