import { createSlice } from "@reduxjs/toolkit";

const dashboardState = {
  selectedNavigatorItem: "Home",
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: dashboardState,
  reducers: {
    updateSelectedNavigatorItem: (state, action) => {
      state.selectedNavigatorItem = action.payload;
    },
  },
});

export default dashboardSlice.reducer;
export const { updateSelectedNavigatorItem } = dashboardSlice.actions;
