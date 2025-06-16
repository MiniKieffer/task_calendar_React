import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Schedule, ScheduleState } from '@/types/calendar';

const initialState: ScheduleState = {
  schedules: {},
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
    moveSchedule: (state, action: PayloadAction<{ date: string; scheduleIndex: number; startTime: number }>) => {
      const {date, scheduleIndex, startTime} = action.payload;
      const period = state.schedules[date][scheduleIndex].period;
      state.schedules[date][scheduleIndex].startTime = startTime;
      state.schedules[date][scheduleIndex].endTime = startTime + period;
    },
    stretchSchedule: (state, action: PayloadAction<{ date: string; scheduleIndex: number; period: number }>) => {
      const {date, scheduleIndex, period} = action.payload;
      const startTime = state.schedules[date][scheduleIndex].startTime;
      state.schedules[date][scheduleIndex].period = period;
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
    
  },
});

export const { addSchedule, moveSchedule, stretchSchedule, updateSchedule, deleteSchedule } = scheduleSlice.actions;
export default scheduleSlice.reducer;