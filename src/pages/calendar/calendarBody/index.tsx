import { useState, useEffect } from "react";
import { CalendarGridContainer, CalendarBodyContainer ,MonthGridCell } from "./styles";
import { Days, getCurrentMonthFirstDayIndex, getNextMonthFirstDayIndex, getLastMonthDates, getNextMonthDates, getCurrentMonthDates } from "@/pages/calendar/utils";


const CalendarBody = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [currentMonthFirstDayIndex, setCurrentMonthFirstDayIndex] = useState<number>(0);
  const [nextMonthFirstDayIndex, setNextMonthFirstDayIndex] = useState<number>(0);
  const [currentMonthDates, setCurrentMonthDates] = useState<number[]>([]);
  const [lastMonthDates, setLastMonthDates] = useState<number[]>([]);
  const [nextMonthDates, setNextMonthDates] = useState<number[]>([]);
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      const newDate = new Date().toLocaleDateString();
      if (newDate !== currentDate.toLocaleDateString()) {
        setCurrentDate(new Date());  // Update the state, which will trigger a re-render
      }
    }, 60000); // Check every minute (60000 ms)
    setCurrentMonthFirstDayIndex(getCurrentMonthFirstDayIndex(currentDate));
    setNextMonthFirstDayIndex(getNextMonthFirstDayIndex(currentDate));
    setLastMonthDates(getLastMonthDates(currentDate, currentMonthFirstDayIndex));
    setNextMonthDates(getNextMonthDates(nextMonthFirstDayIndex));
    setCurrentMonthDates(getCurrentMonthDates(currentDate));
    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  },[currentDate, nextMonthFirstDayIndex, currentMonthFirstDayIndex])
  return (
    <CalendarBodyContainer>
      <CalendarGridContainer variant="calendarDayBar">
        {Days.map((day, index) => (
          <MonthGridCell variant="dayBarCell" key={index}>{day}</MonthGridCell>
        ))}
      </ CalendarGridContainer>
      <CalendarGridContainer variant="calendarMainBox">
        {lastMonthDates.map((day, index) => (
          <MonthGridCell variant="otherMonthCell" key={index}>{day}</MonthGridCell>
        ))}
        {currentMonthDates.map((day, index) => (
          <MonthGridCell variant="thisMonthCell" key={index}>{day}</MonthGridCell>
        ))}
        {nextMonthDates.map((day, index) => (
          <MonthGridCell variant="otherMonthCell" key={index}>{day}</MonthGridCell>
        ))}
      </ CalendarGridContainer>
    </CalendarBodyContainer>
  );
}

export default CalendarBody;