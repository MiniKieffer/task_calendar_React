import React from "react";
import { CalendarBodyContainer } from "./styles";
import CalendarMonthBody from "./calendarMonthBody";
import CalendarWeekBody from "./calendarWeekBody";

interface calendarBodyComponentProps {
  displayDate: Date;  // The message prop must be a string
  weekMonthConversion: string;
}

const CalendarBody: React.FC<calendarBodyComponentProps> = ({ displayDate, weekMonthConversion }) => {

  return (
    <CalendarBodyContainer>
      { weekMonthConversion === 'month' && <CalendarMonthBody displayDate = {displayDate} /> }
      { weekMonthConversion === 'week' && <CalendarWeekBody displayDate={displayDate} /> }
    </CalendarBodyContainer>
  );
}

export default CalendarBody;