import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import categoryReducer from "./reducers/categoryReducer";
const reducer = combineReducers({
  auth: authReducer,
  category: categoryReducer,
});

const store = configureStore({
  reducer,
});

export default store;
