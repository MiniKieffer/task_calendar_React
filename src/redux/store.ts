import { configureStore } from '@reduxjs/toolkit';
import calendarReducer from './slices/calendarSlice';
import holidayReducer from './slices/holidaySlice';

export const store = configureStore({
  reducer: {
    calendar: calendarReducer,
    holiday: holidayReducer,
  },
});

// Types for typed hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;