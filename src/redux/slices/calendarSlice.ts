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
    reorderEventWithinDay: (state, action: PayloadAction<{ date: string; fromIndex: number; toIndex: number }>) => {
      const { date, fromIndex, toIndex } = action.payload;
      const dayEvents = state.events[date];
      if (!dayEvents) return;
      const [moved] = dayEvents.splice(fromIndex, 1);
      dayEvents.splice(toIndex, 0, moved);
    },
    moveEvent: (state, action: PayloadAction<{ event: EventData; fromDate: string; toDate: string }>) => {
      const { event, fromDate, toDate } = action.payload;
      const fromEvents = state.events[fromDate];
      if (!fromEvents) return;
      const index = fromEvents.findIndex(e => e.id === event.id);
      if (index === -1) return;
      const [movedEvent] = fromEvents.splice(index, 1);
      movedEvent.date = toDate;
      if (!state.events[toDate]) state.events[toDate] = [];
      state.events[toDate].push(movedEvent);
    },
    updateEvent: (state, action: PayloadAction<EventData>) => {
      const { id, date } = action.payload;
      const dayEvents = state.events[date];
      if (!dayEvents) return;
      const index = dayEvents.findIndex(e => e.id === id);
      if (index !== -1) {
        dayEvents[index] = action.payload;
      }
    },
    deleteEvent: (state, action: PayloadAction<EventData>) => {
      const { id, date } = action.payload;
      state.events[date] = state.events[date].filter(event => event.id !== id);
    }
  },
});

export const { addEvent, moveEvent, reorderEventWithinDay, updateEvent, deleteEvent } = calendarSlice.actions;
export default calendarSlice.reducer;