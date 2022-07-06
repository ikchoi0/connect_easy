import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';

const reducer = combineReducers({
  auth: authReducer,
});

const store = configureStore({
  reducer,
});

export default store;
