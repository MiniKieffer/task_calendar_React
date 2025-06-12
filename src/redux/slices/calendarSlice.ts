import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EventData, CalendarState } from '@/types/calendar';

const initialState: CalendarState = {
  events: {},
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    addEvent: (state, action: PayloadAction<EventData>) => {
      const { date } = action.payload;
      if (!state.events[date]) state.events[date] = [];
      state.events[date].push(action.payload);
    },

    moveEvent: (
      state,
      action: PayloadAction<{ event: EventData; fromDate: string; toDate: string }>
    ) => {
      const { event, fromDate, toDate } = action.payload;
    
      // Remove from old date
      state.events[fromDate] = state.events[fromDate].filter(
        (e) => e.title !== event.title || e.desc !== event.desc
      );
    
      // Add to new date (with updated date)
      const updatedEvent = { ...event, date: toDate };
      if (!state.events[toDate]) state.events[toDate] = [];
      state.events[toDate].push(updatedEvent);
    },

    reorderEventWithinDay: (
      state,
      action: PayloadAction<{ date: string; fromIndex: number; toIndex: number }>
    ) => {
      const { date, fromIndex, toIndex } = action.payload;
      const dayEvents = state.events[date];
      if (!dayEvents || fromIndex === toIndex) return;
    
      const [moved] = dayEvents.splice(fromIndex, 1);
      dayEvents.splice(toIndex, 0, moved);
    },

    updateEvent: (
      state,
      action: PayloadAction<{ original: EventData; updated: EventData }>
    ) => {
      const { original, updated } = action.payload;
      const events = state.events[original.date];
      if (!events) return;
    
      const index = events.findIndex((e) => e.id === original.id);
      if (index !== -1) {
        events[index] = updated;
      }
    }
  },
});

export const { addEvent, moveEvent, reorderEventWithinDay, updateEvent } = calendarSlice.actions;
export default calendarSlice.reducer;