import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import categoryReducer from "./reducers/categoryReducer";
import dashboardReducer from "./reducers/dashboardReducer";
import scheduleReducer from "./reducers/scheduleReducer";
import meetingReducer from "./reducers/meetingReducer";
import alertReducer from "./reducers/alertReducer";
const reducer = combineReducers({
  auth: authReducer,
  category: categoryReducer,
  dashboard: dashboardReducer,
  scheduler: scheduleReducer,
  meeting: meetingReducer,
  alert: alertReducer,
});

const store = configureStore({
  reducer,
});

export default store;
