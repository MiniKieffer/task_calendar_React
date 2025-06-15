import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { HolidayState } from '@/types/calendar';

const initialState: HolidayState = {
  allHolidays: [],
  filteredHolidays: [],
  loading: false,
  error: null,
};

// Async thunk: fetch by year + countryCode
export const fetchHolidays = createAsyncThunk(
  'holiday/fetchHolidays',
  async ({ year, countryCode }: { year: number; countryCode: string | undefined }) => {
    const res = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`);
    if (!res.ok) throw new Error('Failed to fetch holidays');
    return await res.json();
  }
);

const holidaySlice = createSlice({
  name: 'holiday',
  initialState,
  reducers: {
    filterHolidaysByMonth(state, action: PayloadAction<number>) {
      const month = action.payload;
      state.filteredHolidays = state.allHolidays.filter(holiday => {
        const holidayMonth = new Date(holiday.date).getMonth();
        return holidayMonth === month;
      });
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchHolidays.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHolidays.fulfilled, (state, action) => {
        state.loading = false;
        state.allHolidays = action.payload;
      })
      .addCase(fetchHolidays.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Unknown error';
      });
  },
});

export const { filterHolidaysByMonth } = holidaySlice.actions;
export default holidaySlice.reducer;