import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EventData, CalendarState } from '@/types/calendar';

const initialState: CalendarState = {
  events: {},
  searchedEvents: []
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    addEvent: (state, action: PayloadAction<EventData>) => {
      const { id, date } = action.payload;
      console.log(id);
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
    updateEvent: (state, action: PayloadAction<{ event: EventData; fromDate: string;}>) => {
      const { event, fromDate } = action.payload;
      const dayEvents = state.events[fromDate];
      if (!dayEvents) return;
      const index = dayEvents.findIndex(e => e.id === event.id);
      if (index !== -1) {
        dayEvents[index] = event;
      }
      if(fromDate === event.date) return;
      const [movedEvent] = dayEvents.splice(index, 1);
      if (!state.events[event.date]) state.events[event.date] = [];
      state.events[event.date].push(movedEvent);
    },
    deleteEvent: (state, action: PayloadAction<EventData>) => {
      const { id, date } = action.payload;
      state.events[date] = state.events[date].filter(event => event.id !== id);
    },
    searchEvent: (state, action: PayloadAction<{searchQuery: string}>) => {
      const {searchQuery} = action.payload;
      const keyWords =  searchQuery.toLowerCase().split(/[\s/.-]+/).filter(keyWord => keyWord.trim() !== '');
      if (keyWords.length === 0) return;

      const matched = Object.values(state.events)
        .flat()
        .filter(event => {
          const title = event.title.toLowerCase();
          const desc = event.desc.toLowerCase();
          const styles = event.event_style.map(style => style.toLowerCase());
          const [year, month, day] = event.date.split('-');
          const dateParts = [year, String(Number(month)), String(Number(day))];
          const dateFlat = [
            dateParts.join(''),   
            dateParts.slice(0, 2).join(''), 
            ...dateParts  
          ];
        
          return keyWords.some(keyWord =>
            title.includes(keyWord) ||
            desc.includes(keyWord) ||
            styles.some(style => style.includes(keyWord)) ||
            dateFlat.some(part => part.includes(keyWord))
          );
        });

      state.searchedEvents = matched;
    },
    clearSearch: (state) => {
      state.searchedEvents = [];
    }
  },
});

export const { addEvent, moveEvent, reorderEventWithinDay, updateEvent, deleteEvent, searchEvent, clearSearch } = calendarSlice.actions;
export default calendarSlice.reducer;