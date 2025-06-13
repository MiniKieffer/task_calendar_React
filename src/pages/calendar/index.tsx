import React, { useState, useEffect } from "react";
import CalendarHeader from '../../components/calendar/calendarHeader';
import CalendarBody from '../../components/calendar/calendarBody';
import { useAutoTodayUpdater } from "@/hooks/calendar/useAutoTodayUpdater";
import { CalendarContainer } from './styles';
import { Mode, Direction } from "@/types/calendar";


const CalenderPage: React.FC = () => {
  const [displayDate, setDisplayDate] = useState<Date>(new Date());
  const [dateChangeDirection, setDateChangeDirection] = useState<Direction | ''>('');
  const [weekMonthConversion, setWeekMonthConversion] = useState<Mode>('month');

  useAutoTodayUpdater(() => setDisplayDate(new Date()), displayDate);
  // Reset calendar date according to month change event
  useEffect(() => {
    const newDate = new Date(displayDate);
    const today = new Date();

    if(dateChangeDirection === 'next' && weekMonthConversion === 'month') {
      newDate.setDate(1);
      newDate.setMonth(displayDate.getMonth() + 1);
      if(newDate.getMonth() === today.getMonth()) newDate.setDate(today.getDate());
      setDisplayDate(newDate);
      setDateChangeDirection('');
    } else if(dateChangeDirection === 'previous' && weekMonthConversion === 'month') {
      newDate.setDate(1);
      newDate.setMonth(displayDate.getMonth() - 1);
      if(newDate.getMonth() === today.getMonth()) newDate.setDate(today.getDate());
      setDisplayDate(newDate);
      setDateChangeDirection('');
    } else if(dateChangeDirection === 'next' && weekMonthConversion === 'week') {
      newDate.setDate(displayDate.getDate() + 7);
      setDisplayDate(newDate);
      setDateChangeDirection('');
    } else if(dateChangeDirection === 'previous' && weekMonthConversion === 'week') {
      newDate.setDate(displayDate.getDate() - 7);
      setDisplayDate(newDate);
      setDateChangeDirection('');
    }
  }, [dateChangeDirection, displayDate, weekMonthConversion]);

  const handleChangeDate = (dateChangeDirection:Direction) => {
    setDateChangeDirection(dateChangeDirection);
  }

  const handleWeekMonthConversion = (weekMonthConversion:Mode) => {
    setWeekMonthConversion(weekMonthConversion);
  }

  const handleDirectDateChange = (date: Date) => {
    setDisplayDate(date);
  }

  return (
    <>
      <CalendarContainer>
        <CalendarHeader changeDate={handleChangeDate} directDateChange={handleDirectDateChange} displayDate={displayDate} weekMonthConversion={handleWeekMonthConversion} />
        <CalendarBody displayDate={displayDate} weekMonthConversion = {weekMonthConversion} />
      </CalendarContainer>
    </>
  );
}

export default CalenderPage;


