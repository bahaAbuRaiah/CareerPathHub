import { configureStore } from '@reduxjs/toolkit';
import jobReducer from './slices/jobSlice';
import applicationReducer from './slices/applicationSlice';

export const store = configureStore({
  reducer: {
    jobs: jobReducer,
    applications: applicationReducer,
  },
});
