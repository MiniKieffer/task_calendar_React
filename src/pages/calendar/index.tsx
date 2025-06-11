import React, { useState, useEffect } from "react";
import CalendarHeader from '../../components/calendar/calendarHeader';
import CalendarBody from '../../components/calendar/calendarBody';
import { CalendarContainer } from './styles';

const CalenderPage: React.FC = () => {
  const [displayDate, setDisplayDate] = useState<Date>(new Date());
  const [monthChangeDirection, setMonthChangeDirection] = useState<string>('');
  const [weekMonthConversion, setWeekMonthConversion] = useState<string>('month');
  useEffect(() => {
    const intervalId = setInterval(() => {
      const newDate = new Date().toLocaleDateString();
      if (newDate !== displayDate.toLocaleDateString()) {
        setDisplayDate(new Date());  // Update the state, which will trigger a re-render
      }
    }, 60000); // Check every minute (60000 ms)
    
    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  },[displayDate]);

  // Reset calendar date according to month change event
  useEffect(() => {
    const newDate = new Date(displayDate);
    newDate.setDate(1);
    if(monthChangeDirection === 'next') {
      newDate.setMonth(displayDate.getMonth() + 1);
      setDisplayDate(newDate);
      setMonthChangeDirection('');
    } else if(monthChangeDirection === 'previous') {
      newDate.setMonth(displayDate.getMonth() - 1);
      setDisplayDate(newDate);
      setMonthChangeDirection('');
    }
    
  }, [monthChangeDirection, displayDate])

  const handleChangeMonth = (monthChangeDirection:string) => {
    setMonthChangeDirection(monthChangeDirection);
  }

  const handleWeekMonthConversion = (weekMonthConversion:string) => {
    setWeekMonthConversion(weekMonthConversion);
  }

  return (
    <>
      <CalendarContainer>
        <CalendarHeader changeMonth={handleChangeMonth} displayDate={displayDate} weekMonthConversion={handleWeekMonthConversion} />
        <CalendarBody displayDate={displayDate} weekMonthConversion = {weekMonthConversion} />
      </CalendarContainer>
    </>
  );
}

export default CalenderPage;


