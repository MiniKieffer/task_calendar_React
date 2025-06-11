import React, { useState, useEffect } from "react";
import CalendarHeader from '../../components/calendar/calendarHeader';
import CalendarBody from '../../components/calendar/calendarBody';
import { CalendarContainer } from './styles';

const CalenderPage: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [monthChangeDirection, setMonthChangeDirection] = useState<string>('')
  useEffect(() => {
    const intervalId = setInterval(() => {
      const newDate = new Date().toLocaleDateString();
      if (newDate !== currentDate.toLocaleDateString()) {
        setCurrentDate(new Date());  // Update the state, which will trigger a re-render
      }
    }, 60000); // Check every minute (60000 ms)
    
    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  },[currentDate]);

  // Reset calendar date according to month change event
  useEffect(() => {
    const newDate = new Date(currentDate);
    if(monthChangeDirection === 'next') {
      newDate.setDate(1);
      newDate.setMonth(currentDate.getMonth() + 1);
      setCurrentDate(newDate);
      setMonthChangeDirection('');
    }
    if(monthChangeDirection === 'previous') {
      newDate.setDate(1);
      newDate.setMonth(currentDate.getMonth() - 1);
      setCurrentDate(newDate);
      setMonthChangeDirection('');
    }
  }, [monthChangeDirection, currentDate])

  const handleChangeMonth = (monthChangeDirection:string) => {
    setMonthChangeDirection(monthChangeDirection);
  }

  return (
    <>
      <CalendarContainer>
        <CalendarHeader changeMonth={handleChangeMonth} currentDate={currentDate}/>
        <CalendarBody currentDate={currentDate} />
      </CalendarContainer>
    </>
  );
}

export default CalenderPage;


