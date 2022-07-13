import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { showAlertMessage } from './alertReducer';
import * as api from '../../api';

const userState = {
  firstName: '',
  lastName: '',
  email: '',
  description: '',
  street: '',
  state: '',
  country: '',
  postalCode: '',
  price: 0,
  category: '',
  profilePicture: '',
  imageFile: '',
  imageName: '',
  previewImage: '',
  available: false,
};

export const getUserProfile = createAsyncThunk(
  'user/getUserProfile',
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
  'user/setUserProfile',
  async (data, thunkApi) => {
    const response = await api.updateUserProfile(data);
    if (response.error) {
      thunkApi.dispatch(showAlertMessage(response.message));
      return thunkApi.rejectWithValue(response.message);
    }
  }
);

const userSlice = createSlice({
  name: 'userProfile',
  initialState: userState,
  reducers: {
    setProfile: (state, action) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.description = action.payload.description;
      state.street = action.payload.street;
      state.state = action.payload.state;
      state.country = action.payload.country;
      state.postalCode = action.payload.postalCode;
      state.price = action.payload.price;
      state.category = action.payload.category;
      state.profilePicture = action.payload.profilePicture;
      state.imageFile = action.payload.imageFile;
      state.imageName = action.payload.imageName;
      state.previewImage = action.payload.previewImage;
      state.available = action.payload.available;
    },
  },
  extraReducers: {
    [getUserProfile.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.description = action.payload.options?.description;
      state.street = action.payload.options?.street;
      state.state = action.payload.options?.state;
      state.country = action.payload.options?.country;
      state.postalCode = action.payload.options?.postalCode;
      state.price = action.payload.options?.price;
      state.category = action.payload.category;
      state.profilePicture = action.payload.options?.profilePicture;
      state.imageFile = action.payload.imageFile;
      state.imageName = action.payload.imageName;
      state.previewImage = action.payload.previewImage;
      state.available = action.payload.options?.available;
    },
  },
});

export const { setProfile } = userSlice.actions;
export default userSlice.reducer;
