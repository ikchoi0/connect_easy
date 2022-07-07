import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getCategories } from "../../api";
// import { getCategory } from "../../api/categoryAPI";
const categoryState = {
  categoryList: null,
  isLoading: true,
  selectedCategory: null,
};

export const category = createAsyncThunk(
  "category/getCategory",
  async (thunkApi) => {
    const response = await getCategories();

    if (response.error) return thunkApi.rejectWithValue(response.message);
    // console.log(response.data.categoryList);
    return response.data.categoryList;
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
      // handle rejected
      state.isLoading = false;
    },
    [category.pending]: (state, _) => {
      // handle rejected
      state.isLoading = true;
    },
  },
});

export default categorySlice.reducer;
export const { updateSelectedCategory } = categorySlice.actions;
