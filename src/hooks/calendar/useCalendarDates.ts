import { useMemo } from "react";
import { 
         getCurrentMonthFirstDayIndex,
         getNextMonthFirstDayIndex, 
         getLastMonthDates, 
         getNextMonthDates, 
         getCurrentMonthDates,
         getTimeZone,
         getCurrentWeekDates,
         getCurrentWeekFirstDate,
         getCurrentWeekDays
        } from "@/utils/calendar";

const useCalendarDates = (displayDate: Date) => {
  const timeZone = useMemo(() => getTimeZone(displayDate), [displayDate]);
  const currentWeekFirstDate = useMemo(() => getCurrentWeekFirstDate(displayDate), [displayDate]);
  const currentWeekDates = useMemo(() => getCurrentWeekDates(currentWeekFirstDate), [currentWeekFirstDate]);
  const currentWeekDays = useMemo(() => getCurrentWeekDays(currentWeekFirstDate), [currentWeekFirstDate]);
  const currentMonthFirstDayIndex = useMemo(() => getCurrentMonthFirstDayIndex(displayDate), [displayDate]);
  const nextMonthFirstDayIndex = useMemo(() => getNextMonthFirstDayIndex(displayDate), [displayDate]);
  const currentMonthDates = useMemo(() => getCurrentMonthDates(displayDate), [displayDate]);
  const lastMonthDates = useMemo(() => getLastMonthDates(displayDate, currentMonthFirstDayIndex), [displayDate, currentMonthFirstDayIndex]);
  const nextMonthDates = useMemo(() => getNextMonthDates(nextMonthFirstDayIndex), [nextMonthFirstDayIndex]);

  return { currentMonthFirstDayIndex, nextMonthFirstDayIndex, currentMonthDates, lastMonthDates, nextMonthDates, timeZone, currentWeekDates, currentWeekFirstDate, currentWeekDays };
};

export default useCalendarDates;