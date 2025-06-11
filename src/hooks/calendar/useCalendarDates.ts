import { useMemo } from "react";
import { 
         getCurrentMonthFirstDayIndex,
         getNextMonthFirstDayIndex, 
         getLastMonthDates, 
         getNextMonthDates, 
         getCurrentMonthDates 
        } from "@/utils/calendar";

const useCalendarDates = (currentDate: Date) => {

  const currentMonthFirstDayIndex = useMemo(() => getCurrentMonthFirstDayIndex(currentDate), [currentDate]);
  const nextMonthFirstDayIndex = useMemo(() => getNextMonthFirstDayIndex(currentDate), [currentDate]);
  const currentMonthDates = useMemo(() => getCurrentMonthDates(currentDate), [currentDate]);
  const lastMonthDates = useMemo(() => getLastMonthDates(currentDate, currentMonthFirstDayIndex), [currentDate, currentMonthFirstDayIndex]);
  const nextMonthDates = useMemo(() => getNextMonthDates(nextMonthFirstDayIndex), [nextMonthFirstDayIndex]);

  return { currentMonthFirstDayIndex, nextMonthFirstDayIndex, currentMonthDates, lastMonthDates, nextMonthDates };
};

export default useCalendarDates;