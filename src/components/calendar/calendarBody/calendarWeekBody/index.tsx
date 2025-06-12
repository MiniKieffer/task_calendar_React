import React from "react";
import { 
         CalendarGridContainer,  
         WeekGridCell
        } from "../styles";
import { Days } from "@/utils/calendar";
import useCalendarDates from "@/hooks/calendar/useCalendarDates";

interface calendarWeekBodyComponentProps {
  displayDate: Date;  // The message prop must be a string
}

const CalendarWeekBody: React.FC<calendarWeekBodyComponentProps> = ({ displayDate }) => {
  const { timeZone, currentWeekDates } = useCalendarDates(displayDate);

  return (
    <>
      <CalendarGridContainer variant="calendarWeekDayBar">
        <WeekGridCell variant="timeZoneCell">{timeZone}</WeekGridCell>
        {Days.map((day, index) => (
          <WeekGridCell variant={
            currentWeekDates[index] === new Date().getDate() 
            && displayDate.getMonth() === new Date().getMonth() 
            && displayDate.getFullYear() === new Date().getFullYear() ? 'dayBarCellToday' : 'dayBarCell'} key={index}>
            {day} <br />
            {currentWeekDates[index]}
          </WeekGridCell>
        ))}
      </ CalendarGridContainer>
      <CalendarGridContainer variant="calendarWeekBox">
        {Array.from({ length: 192 }).map((_, index) => (
          <WeekGridCell variant={(index + 1) % 8 === 1 ? "timeBarCell" : "weekCell"} key={index}>
            {(((index + 1) % 8 === 1) && ((index / 8 + 1) < 13) && `${index / 8 + 1} `) || (((index + 1) % 8 === 1) && ((index / 8 + 1) > 12) && `${index / 8 - 11} `)}
            {(((index + 1) % 8 === 1) && ((index / 8 + 1) < 13) && 'am') || (((index + 1) % 8 === 1) && ((index / 8 + 1) > 12) && 'pm')}
          </WeekGridCell>
      ))}
      </ CalendarGridContainer>
    </>
  );
}

export default CalendarWeekBody;