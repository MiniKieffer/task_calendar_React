import { configureStore } from '@reduxjs/toolkit';
import calendarReducer from './slices/calendarSlice';
import holidayReducer from './slices/holidaySlice';
import scheduleReducer from './slices/scheduleSlice'

export const store = configureStore({
  reducer: {
    calendar: calendarReducer,
    holiday: holidayReducer,
    schedule: scheduleReducer,
  },
});

// Types for typed hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;