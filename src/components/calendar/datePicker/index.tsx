import React from 'react';
import { Months } from "@/utils/calendar";
import { DatePickerContainer, DatePickerSubSelector, DatePickerArrowButton, DatePickerLabel } from './styles';
import { CalendarGridContainer, MonthGridCell } from '../calendarBody/styles';
import useCalendarDates from "@/hooks/calendar/useCalendarDates";
import { calendarGridGenerateTool } from "@/utils/calendar";


interface DatePickerComponentProps {
  year: number;
  month: number;
  onYearChange: (direction: "prev" | "next") => void;
  onMonthChange: (direction: "prev" | "next") => void;
  displayDate: Date;
  setDate : (date : number) => void;
  currentDate : number;
  setDatePickerOpen: (datePickerOpen : boolean) => void;
}

const DatePicker: React.FC<DatePickerComponentProps> = ({year, month, onYearChange, onMonthChange, displayDate, setDate, currentDate, setDatePickerOpen}) => {
  const { currentMonthDates, lastMonthDates, nextMonthDates } = useCalendarDates(new Date(year, month, currentDate));
  return (
    <DatePickerContainer>
      {/* Year Selector */}
      <DatePickerSubSelector>
        <DatePickerArrowButton onClick={() => onYearChange("prev")}>
          <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" viewBox="0 0 1024 1024" version="1.1">
            <path xmlns="http://www.w3.org/2000/svg" d="M768 903.232l-50.432 56.768L256 512l461.568-448 50.432 56.768L364.928 512z" fill="#000000"/>
          </svg>
        </DatePickerArrowButton>
        <DatePickerLabel>{year}</DatePickerLabel>
        <DatePickerArrowButton onClick={() => onYearChange("next")}>
          <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" viewBox="0 0 1024 1024" version="1.1">
            <path xmlns="http://www.w3.org/2000/svg" d="M256 120.768L306.432 64 768 512l-461.568 448L256 903.232 659.072 512z" fill="#000000"/>
          </svg>
        </DatePickerArrowButton>
      </DatePickerSubSelector>

      {/* Month Selector */}
      <DatePickerSubSelector>
        <DatePickerArrowButton onClick={() => onMonthChange("prev")}>
          <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" viewBox="0 0 1024 1024" version="1.1">
            <path xmlns="http://www.w3.org/2000/svg" d="M768 903.232l-50.432 56.768L256 512l461.568-448 50.432 56.768L364.928 512z" fill="#000000"/>
          </svg>
        </DatePickerArrowButton>
        <DatePickerLabel>{Months[month]}</DatePickerLabel>
        <DatePickerArrowButton onClick={() => onMonthChange("next")}>
          <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" viewBox="0 0 1024 1024" version="1.1">
            <path xmlns="http://www.w3.org/2000/svg" d="M256 120.768L306.432 64 768 512l-461.568 448L256 903.232 659.072 512z" fill="#000000"/>
          </svg>
        </DatePickerArrowButton>
      </DatePickerSubSelector>
      <CalendarGridContainer variant='datePiker'>
         {[...lastMonthDates, ...currentMonthDates, ...nextMonthDates].map((date, index, allDates) => {
         const { variant } = calendarGridGenerateTool(displayDate, lastMonthDates, currentMonthDates, date, index, allDates);
          return (
           <MonthGridCell key={index} variant={`${variant}DatePicker`} onClick={() => {setDate(date); setDatePickerOpen(false);}}>
            {date}
           </MonthGridCell>
          );
        })}
      </CalendarGridContainer>
    </DatePickerContainer>
  );
}

export default DatePicker;