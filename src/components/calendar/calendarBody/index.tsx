import React from "react";
import { 
         CalendarGridContainer, 
         CalendarBodyContainer, 
         MonthGridCell 
        } from "./styles";
import useCalendarDates from "@/hooks/calendar/useCalendarDates";
import { Days, Months } from "@/utils/calendar";

interface calendarBodyComponentProps {
  currentDate: Date;  // The message prop must be a string
}

const CalendarBody: React.FC<calendarBodyComponentProps> = ({ currentDate }) => {
  const { currentMonthDates, lastMonthDates, nextMonthDates } = useCalendarDates(currentDate);

  return (
    <CalendarBodyContainer>
      <CalendarGridContainer variant="calendarDayBar">
        {Days.map((day, index) => (
          <MonthGridCell variant="dayBarCell" key={index}>
            {(index === currentMonthDates.length - 1) && `${Months[currentDate.getMonth() - 1]} `}
            {day}
          </MonthGridCell>
        ))}
      </ CalendarGridContainer>
      <CalendarGridContainer variant="calendarMainBox">
        {lastMonthDates.map((day, index) => (
          <MonthGridCell variant="otherMonthCell" key={index}>{day}</MonthGridCell>
        ))}
        {currentMonthDates.map((day, index) => (
          <MonthGridCell variant={day === new Date().getDate() ? "todayCell" : "thisMonthCell"} key={index}>
            {(day === 1 || index === currentMonthDates.length - 1) && `${Months[currentDate.getMonth()]} `}
            {day}
          </MonthGridCell>
        ))}
        {nextMonthDates.map((day, index) => (
          <MonthGridCell variant="otherMonthCell" key={index}>
            {(day === 1) && `${Months[currentDate.getMonth() + 1]} `}
            {day}
          </MonthGridCell>
        ))}
      </ CalendarGridContainer>
    </CalendarBodyContainer>
  );
}

export default CalendarBody;