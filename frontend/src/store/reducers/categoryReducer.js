import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCategories, getConsultantsWithinCategory } from "../../api";
import { showAlertMessage } from "./alertReducer";

const categoryState = {
  categoryList: [],
  usersWithinCategory: [],
  isLoading: true,
  selectedCategory: null,
};

export const category = createAsyncThunk(
  "category/getCategory",
  async (thunkApi) => {
    const response = await getCategories();

    if (response.error) {
      thunkApi.dispatch(showAlertMessage(response.message));
      return thunkApi.rejectWithValue(response.message);
    }
    return response.data.categoryList;
  }
);

export const getUsersWithinCategory = createAsyncThunk(
  "category/getUsersWithinCategory",
  async (categoryName, thunkApi) => {
    const response = await getConsultantsWithinCategory(categoryName);

    if (response.error) {
      thunkApi.dispatch(showAlertMessage(response.message));
      return thunkApi.rejectWithValue(response.message);
    }

    return response.data.data;
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState: categoryState,
  reducers: {
    updateSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },
  extraReducers: {
    [category.fulfilled]: (state, action) => {
      state.categoryList = action.payload;
      state.isLoading = false;
    },
    [category.rejected]: (state, _) => {
      state.isLoading = false;
    },
    [category.pending]: (state, _) => {
      state.isLoading = true;
    },
    [getUsersWithinCategory.fulfilled]: (state, action) => {
      state.usersWithinCategory = action.payload;
      state.isLoading = true;
    },
  },
});

export default categorySlice.reducer;
export const { updateSelectedCategory } = categorySlice.actions;
