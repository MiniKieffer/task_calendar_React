import React, { useState, useEffect } from "react";
import CalendarHeader from '../../components/calendar/calendarHeader';
import CalendarBody from '../../components/calendar/calendarBody';
import { CalendarContainer } from './styles';
import { Mode, Direction } from "@/types/calendar";
import { useAppDispatch } from "@/hooks/redux/useAppDispatch";
import { fetchHolidays } from "@/redux/slices/holidaySlice";
import { getCountryCodeByName } from "@/utils/calendar";

const CalenderPage: React.FC = () => {
  const [displayDate, setDisplayDate] = useState<Date>(new Date());
  const [dateChangeDirection, setDateChangeDirection] = useState<Direction | ''>('');
  const [weekMonthConversion, setWeekMonthConversion] = useState<Mode>('month');
  const [countryCode, setCountryCode] = useState<string | undefined>('SE');
  const dispatch = useAppDispatch();

  // manage the displayDate across calendar
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

  useEffect(() => {
    dispatch(fetchHolidays({ year: displayDate.getFullYear(), countryCode: countryCode }));
  },[countryCode, displayDate, dispatch]);

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
        <CalendarHeader 
                changeDate={handleChangeDate} 
                directDateChange={handleDirectDateChange} 
                displayDate={displayDate} 
                weekMonthConversion={handleWeekMonthConversion} 
                getCountry = {(country : string) => {setCountryCode(getCountryCodeByName(country))}}
          />
        <CalendarBody displayDate={displayDate} weekMonthConversion = {weekMonthConversion} directDateChange={handleDirectDateChange}  />
      </CalendarContainer>
    </>
  );
}

export default CalenderPage;


