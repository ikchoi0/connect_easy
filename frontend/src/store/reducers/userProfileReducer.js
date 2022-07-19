import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { showAlertMessage, showSuccessMessage } from "./alertReducer";
import * as api from "../../api";

const userState = {
  firstName: "",
  lastName: "",
  email: "",
  description: "",
  city: "",
  street: "",
  state: "",
  country: "",
  postalCode: "",
  price: 0,
  category: "",
  profilePicture: "",
  imageFile: "",

  previewImage: "",
  available: false,
  isSaving: false,
};

export const getUserProfile = createAsyncThunk(
  "user/getUserProfile",
  async (_, thunkApi) => {
    const response = await api.getUserProfile();
    if (response.error) {
      thunkApi.dispatch(showAlertMessage(response.message));
      return thunkApi.rejectWithValue(response.message);
    }

    return response.data;
  }
);

export const updateUserProfile = createAsyncThunk(
  "user/setUserProfile",
  async (data, thunkApi) => {
    const response = await api.updateUserProfile(data);

    if (response.error) {
      thunkApi.dispatch(showAlertMessage(response.message));
      return thunkApi.rejectWithValue(response.message);
    }

    // SHOW SUCCESS MESSAGE
    thunkApi.dispatch(showSuccessMessage("User profile updated"));
    return response.data;
  }
);

const userSlice = createSlice({
  name: "userProfile",
  initialState: userState,

  extraReducers: {
    [getUserProfile.fulfilled]: (state, action) => {
      state.firstName = action.payload.user.firstName;
      state.lastName = action.payload.user.lastName;
      state.email = action.payload.user.email;
      state.description = action.payload.user.options?.description || "";
      state.street = action.payload.user.options?.street || "";
      state.city = action.payload.user.options?.city || "";
      state.state = action.payload.user.options?.state || "";
      state.country = action.payload.user.options?.country || "";
      state.postalCode = action.payload.user.options?.postalCode || "";
      state.price = action.payload.user.options?.price || "";
      state.category = action.payload.categoryId;
      state.profilePicture = action.payload.user.options?.profilePicture || "";
      state.available = action.payload.user.options?.available || "";
    },
    [updateUserProfile.pending]: (state, action) => {
      state.isSaving = true;
    },
    [updateUserProfile.fulfilled]: (state, action) => {
      state.isSaving = false;
    },
    [updateUserProfile.rejected]: (state, action) => {
      state.isSaving = false;
    },
  },
});

export const { setProfile } = userSlice.actions;
export default userSlice.reducer;
