// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import customerReducer from '../slices/customerSlice';

const store = configureStore({
  reducer: {
    customer: customerReducer,
  },
});

export default store;
