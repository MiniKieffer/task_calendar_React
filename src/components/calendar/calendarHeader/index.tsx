import React, { useState, useEffect } from 'react';
import CustomButton from "@/components/common/customButton";
import MonthYearSelector from '../monthYearSelector';
import { CalendarHeaderContainer, CalendarHeaderSection, SearchResultContainer, SearchResultSubSelector } from "./styles";
import { MonthsFullName } from "@/utils/calendar";
import { Direction, Mode } from "@/types/calendar";
import { SearchInput } from './styles';
import { useAppSelector } from "@/hooks/redux/useAppSelector";
import { useAppDispatch } from '@/hooks/redux/useAppDispatch';
import { searchEvent, clearSearch } from '@/redux/slices/calendarSlice';
import { CountryContainer, CountryDropdown } from './styles';
import { OptionsList, OptionLabel } from '../eventEditor/styles';
import { countries } from '@/utils/calendar';

interface calendarHeaderComponentProps {
  displayDate: Date; 
  changeDate: (data: Direction) => void;
  weekMonthConversion: (data : Mode) => void;
  directDateChange: (data: Date) => void;
  getCountry : (country : string) => void
}

const CalendarHeader: React.FC<calendarHeaderComponentProps> = ({ displayDate, changeDate, weekMonthConversion, directDateChange, getCountry }) => {
  const [activeWeekMonthConversion, setActiveWeekMonthConversion] = useState<'week' | 'month'>('month');
  const [openMonthYearSelector, setOpenMonthYearSelector] = useState(false);
  const [openSearchResult, setOpenSearchResult] = useState(false);
  const [year, setYear] = useState(displayDate.getFullYear());
  const [month, setMonth] = useState(displayDate.getMonth());
  const [searchQuery, setSearchQuery] = useState('');
  const [country, setCountry] = useState<string>('Sweden');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useAppDispatch();
  const searchedEvents = useAppSelector((state) => state.calendar.searchedEvents);

  const handleActiveWeekMonthConversion = (weekMonthState: 'week' | 'month') => {
  setActiveWeekMonthConversion(weekMonthState);
  weekMonthConversion(weekMonthState); 
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    dispatch(searchEvent({searchQuery}));
    setOpenSearchResult(true);
  };

  const gotoSearchEvent = ( e : React.MouseEvent, searchDate : string ) => {
    e.stopPropagation();
    directDateChange(new Date(searchDate));
    setSearchQuery("");
    setOpenSearchResult(false);
    dispatch(clearSearch());
  }

  useEffect(() => {
    if (!openMonthYearSelector) {
      const newDate = new Date();
      newDate.setFullYear(year);
      newDate.setMonth(month);
      directDateChange(newDate);
    }
  },[openMonthYearSelector]);

  useEffect(() => {
    setYear(displayDate.getFullYear());
    setMonth(displayDate.getMonth());
  },[displayDate]);

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
            <CustomButton onClick={() => directDateChange(new Date())}>Today</CustomButton>
          </CalendarHeaderSection>
          <CalendarHeaderSection variant="center">
            <CustomButton variant="calendarDatePiker" onClick={() => setOpenMonthYearSelector(!openMonthYearSelector)}>
              {`${MonthsFullName[month]} ${year}`}
            </CustomButton>
            {openMonthYearSelector && 
              <MonthYearSelector
                year={year}
                month={month}
                onYearChange={(dir) => setYear(y => dir === "next" ? y + 1 : y - 1)}
                onMonthChange={(dir) => setMonth(m => {
                  if (dir === "next") return (m + 1) % 12;
                  return (m + 11) % 12;
                })}
              />
            }
          </CalendarHeaderSection>
          <CalendarHeaderSection variant="right">
            <SearchInput
              type="text"
              placeholder="Search events..."
              name="title"
              value={searchQuery}
              onChange={handleSearchChange}
              required
            />
            {openSearchResult && searchQuery &&
              <SearchResultContainer onClick={() => {setOpenSearchResult(false); setSearchQuery('');}}>
                {searchedEvents?.length === 0 ? "No Results" : searchedEvents.map((searchedEvent) => (
                  <SearchResultSubSelector key={searchedEvent.id} onClick={(e) => gotoSearchEvent(e ,searchedEvent.date)}>
                    {`${searchedEvent.date}: ${searchedEvent.title}`}
                  </SearchResultSubSelector>
                ))}
              </SearchResultContainer>
            }
            <CountryContainer>
              <CountryDropdown onClick={() => setDropdownOpen(!dropdownOpen)}>
                {country}
              </CountryDropdown >
              {dropdownOpen && (
                <OptionsList>
                  {countries.map((country, id) => (
                    <OptionLabel
                      key={id}
                      onClick={() => {
                        setCountry(country.name); 
                        getCountry(country.name);
                        setDropdownOpen(false); 
                      }}
                    >
                      {country.name}
                    </OptionLabel>
                  ))}
                </OptionsList>
              )}
            </CountryContainer>
            <CustomButton onClick={() => handleActiveWeekMonthConversion('week')} activestate={activeWeekMonthConversion === 'week' ? 'active' : 'inactive'}>Week</CustomButton>
            <CustomButton onClick={() => handleActiveWeekMonthConversion('month')} activestate={activeWeekMonthConversion === 'month' ? 'active' : 'inactive'}>Month</CustomButton>
          </CalendarHeaderSection>
      </CalendarHeaderContainer>
    </>
  );
}

export default CalendarHeader;