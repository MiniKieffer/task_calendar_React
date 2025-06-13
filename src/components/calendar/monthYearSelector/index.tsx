import React from 'react';
import { Months } from "@/utils/calendar";
import { MonthWeekSelectorContainer, SubSelector, ArrowButton, Label } from './styles';


interface MonthYearSelectorComponentProps {
  year: number;
  month: number;
  onYearChange: (direction: "prev" | "next") => void;
  onMonthChange: (direction: "prev" | "next") => void;
}

const MonthYearSelector: React.FC<MonthYearSelectorComponentProps> = ({year, month, onYearChange, onMonthChange}) => {
  
  return (
    <MonthWeekSelectorContainer>
      {/* Year Selector */}
      <SubSelector>
        <ArrowButton onClick={() => onYearChange("prev")}>
          <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" viewBox="0 0 1024 1024" version="1.1">
            <path xmlns="http://www.w3.org/2000/svg" d="M768 903.232l-50.432 56.768L256 512l461.568-448 50.432 56.768L364.928 512z" fill="#000000"/>
          </svg>
        </ArrowButton>
        <Label>{year}</Label>
        <ArrowButton onClick={() => onYearChange("next")}>
          <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" viewBox="0 0 1024 1024" version="1.1">
            <path xmlns="http://www.w3.org/2000/svg" d="M256 120.768L306.432 64 768 512l-461.568 448L256 903.232 659.072 512z" fill="#000000"/>
          </svg>
        </ArrowButton>
      </SubSelector>

      {/* Month Selector */}
      <SubSelector>
        <ArrowButton onClick={() => onMonthChange("prev")}>
          <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" viewBox="0 0 1024 1024" version="1.1">
            <path xmlns="http://www.w3.org/2000/svg" d="M768 903.232l-50.432 56.768L256 512l461.568-448 50.432 56.768L364.928 512z" fill="#000000"/>
          </svg>
        </ArrowButton>
        <Label>{Months[month]}</Label>
        <ArrowButton onClick={() => onMonthChange("next")}>
          <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" viewBox="0 0 1024 1024" version="1.1">
            <path xmlns="http://www.w3.org/2000/svg" d="M256 120.768L306.432 64 768 512l-461.568 448L256 903.232 659.072 512z" fill="#000000"/>
          </svg>
        </ArrowButton>
      </SubSelector>
    </MonthWeekSelectorContainer>
  );
}

export default MonthYearSelector;