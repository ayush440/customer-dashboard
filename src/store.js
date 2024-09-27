import { configureStore } from '@reduxjs/toolkit';
import customerReducer from './features/customerSlice';

export const store = configureStore({
  reducer: {
    customers: customerReducer,
  },
});
