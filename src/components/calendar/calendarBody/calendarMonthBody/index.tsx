import React from "react";
import { 
         CalendarGridContainer, 
         CalendarBodyContainer, 
         MonthGridCell 
        } from "../styles";
import useCalendarDates from "@/hooks/calendar/useCalendarDates";
import { Days, Months } from "@/utils/calendar";

interface calendarMonthBodyComponentProps {
  displayDate: Date;  // The message prop must be a string
}

const CalendarMonthBody: React.FC<calendarMonthBodyComponentProps> = ({ displayDate }) => {
  const { currentMonthDates, lastMonthDates, nextMonthDates } = useCalendarDates(displayDate);

  return (
    <CalendarBodyContainer>
      <CalendarGridContainer variant="calendarDayBar">
        {Days.map((day, index) => (
          <MonthGridCell variant="dayBarCell" key={index}>
            {day}
          </MonthGridCell>
        ))}
      </ CalendarGridContainer>
      <CalendarGridContainer variant="calendarMonthBox">
        {lastMonthDates.map((date, index) => (
          <MonthGridCell variant="otherMonthCell" key={index}>
            {index === lastMonthDates.length - 1 && `${Months[displayDate.getMonth() === 0 ? 11 : displayDate.getMonth() - 1]} `}
            {date}
          </MonthGridCell>
        ))}
        {currentMonthDates.map((date, index) => (
          <MonthGridCell variant={date === new Date().getDate() && displayDate.getMonth() === new Date().getMonth() ? "todayCell" : "thisMonthCell"} key={index}>
            {(date === 1 || index === currentMonthDates.length - 1) && `${Months[displayDate.getMonth()]} `}
            {date}
          </MonthGridCell>
        ))}
        {nextMonthDates.map((date, index) => (
          <MonthGridCell variant="otherMonthCell" key={index}>
            {(date === 1) && `${Months[displayDate.getMonth() === 11 ? 0 : displayDate.getMonth() + 1]} `}
            {date}
          </MonthGridCell>
        ))}
      </ CalendarGridContainer>
    </CalendarBodyContainer>
  );
}

export default CalendarMonthBody;