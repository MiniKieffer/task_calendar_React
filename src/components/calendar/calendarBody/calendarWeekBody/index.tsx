import React from "react";
import { 
         CalendarGridContainer,  
         WeekGridCell
        } from "../styles";
import { Days } from "@/utils/calendar";

interface calendarWeekBodyComponentProps {
  displayDate: Date;  // The message prop must be a string
}

const CalendarWeekBody: React.FC<calendarWeekBodyComponentProps> = ({ displayDate }) => {

  return (
    <>
      <CalendarGridContainer variant="calendarWeekDayBar">
        <WeekGridCell variant="timeBarCell">GMT</WeekGridCell>
        {Days.map((day, index) => (
          <WeekGridCell variant="dayBarCell" key={index}>
            {day}
          </WeekGridCell>
        ))}
      </ CalendarGridContainer>
      <CalendarGridContainer variant="calendarWeekBox">
        {Array.from({ length: 192 }).map((_, index) => (
          <WeekGridCell variant={(index + 1) % 8 === 1 ? "timeBarCell" : "dayBarCell"} key={index}>
            {((index + 1) % 8 === 1) && `${index + 1} `}
          </WeekGridCell>
      ))}
      </ CalendarGridContainer>
    </>
  );
}

export default CalendarWeekBody;