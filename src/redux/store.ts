import { configureStore } from '@reduxjs/toolkit';
import calendarReducer from './slices/calendarSlice';

export const store = configureStore({
  reducer: {
    calendar: calendarReducer,
  },
});

// Types for typed hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;