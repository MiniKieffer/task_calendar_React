import React, { useState } from 'react';
import CustomButton from "@/components/common/customButton";
import { CalendarHeaderContainer, CalendarHeaderSection } from "./styles";
import { MonthsFullName } from "@/utils/calendar";
import { Direction, Mode } from "@/types/calendar"

interface calendarHeaderComponentProps {
  displayDate: Date; 
  changeDate: (data: Direction) => void;
  weekMonthConversion: (data : Mode) => void;
}

const CalendarHeader: React.FC<calendarHeaderComponentProps> = ({ displayDate, changeDate, weekMonthConversion }) => {
  const [activeWeekMonthConversion, setActiveWeekMonthConversion] = useState<'week' | 'month'>('month');
  const handleActiveWeekMonthConversion = (weekMonthState: 'week' | 'month') => {
  setActiveWeekMonthConversion(weekMonthState);
  weekMonthConversion(weekMonthState); 
  };
  
  return (
    <>
      <CalendarHeaderContainer>
          <CalendarHeaderSection>
            <CustomButton variant="calendarHeaderUpDown" onClick={() => changeDate('previous')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" viewBox="0 0 1024 1024" version="1.1">
                <path d="M903.232 768l56.768-50.432L512 256l-448 461.568 56.768 50.432L512 364.928z" fill="#000000"/>
              </svg>
            </CustomButton>
            <CustomButton variant="calendarHeaderUpDown" onClick={() => changeDate('next')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" viewBox="0 0 1024 1024" version="1.1">
                <path d="M903.232 256l56.768 50.432L512 768 64 306.432 120.768 256 512 659.072z" fill="#000000"/>
              </svg>
            </CustomButton>
          </CalendarHeaderSection>
          <CalendarHeaderSection variant="center">
            <CustomButton variant="calendarDatePiker">{`${MonthsFullName[displayDate.getMonth()]} ${displayDate.getFullYear()}`}</CustomButton>
          </CalendarHeaderSection>
          <CalendarHeaderSection variant="right">
            <CustomButton onClick={() => handleActiveWeekMonthConversion('week')} activestate={activeWeekMonthConversion === 'week' ? 'active' : 'inactive'}>Week</CustomButton>
            <CustomButton onClick={() => handleActiveWeekMonthConversion('month')} activestate={activeWeekMonthConversion === 'month' ? 'active' : 'inactive'}>Month</CustomButton>
          </CalendarHeaderSection>
      </CalendarHeaderContainer>
    </>
  );
}

export default CalendarHeader;