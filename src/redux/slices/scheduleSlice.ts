import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Schedule, ScheduleState } from '@/types/calendar';

const initialState: ScheduleState = {
  schedules: {},
  searchedSchedule: []
};

const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    addSchedule: (state, action: PayloadAction<Schedule>) => {
      const { date } = action.payload;
      if (!state.schedules[date]) state.schedules[date] = [];
      state.schedules[date].push(action.payload);
    },
    moveSchedule: (state, action: PayloadAction<{ date: string; scheduleIndex: number; startTime: number; period: number }>) => {
      const {date, scheduleIndex, startTime, period} = action.payload;
      state.schedules[date][scheduleIndex].period = period;
      state.schedules[date][scheduleIndex].startTime = startTime;
      state.schedules[date][scheduleIndex].endTime = startTime + period;
    },
    updateSchedule: (state, action: PayloadAction<{ schedule: Schedule; fromDate: string;}>) => {
      const { schedule, fromDate } = action.payload;
      const daySchedules = state.schedules[fromDate];
      if (!daySchedules) return;
      const index = daySchedules.findIndex(e => e.id === schedule.id);
      if (index !== -1) {
        daySchedules[index] = schedule;
      }
      if(fromDate === schedule.date) return;
      const [movedEvent] = daySchedules.splice(index, 1);
      if (!state.schedules[schedule.date]) state.schedules[schedule.date] = [];
      state.schedules[schedule.date].push(movedEvent);
    },
    deleteSchedule: (state, action: PayloadAction<Schedule>) => {
      const { id, date } = action.payload;
      state.schedules[date] = state.schedules[date].filter(schedule => schedule.id !== id);
    },
    searchSchedule: (state, action: PayloadAction<{searchQuery: string}>) => {
      const {searchQuery} = action.payload;
      const keyWords =  searchQuery.toLowerCase().split(/[\s/.-]+/).filter(keyWord => keyWord.trim() !== '');
      if (keyWords.length === 0) return;

      const matched = Object.values(state.schedules)
        .flat()
        .filter(schedule => {
          const title = schedule.title.toLowerCase();
          const desc = schedule.desc.toLowerCase();
          const [year, month, day] = schedule.date.split('-');
          const dateParts = [year, String(Number(month)), String(Number(day))];
          const dateFlat = [
            dateParts.join(''),   
            dateParts.slice(0, 2).join(''), 
            ...dateParts  
          ];
        
          return keyWords.some(keyWord =>
            title.includes(keyWord) ||
            desc.includes(keyWord) ||
            dateFlat.some(part => part.includes(keyWord))
          );
        });

      state.searchedSchedule = matched;
    },
    clearScheduleSearch: (state) => {
      state.searchedSchedule = [];
    }
  },
});

export const { addSchedule, moveSchedule, updateSchedule, deleteSchedule, searchSchedule, clearScheduleSearch } = scheduleSlice.actions;
export default scheduleSlice.reducer;