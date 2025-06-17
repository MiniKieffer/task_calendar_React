import React, { useState, useEffect, useRef } from 'react';
import CustomButton from "@/components/common/customButton";
import MonthYearSelector from '../monthYearSelector';
import { CalendarHeaderContainer, CalendarHeaderSection, SearchResultContainer, SearchResultSubSelector, MobileHeader } from "./styles";
import { MonthsFullName } from "@/utils/calendar";
import { Direction, Mode } from "@/types/calendar";
import { SearchInput } from './styles';
import { useAppSelector } from "@/hooks/redux/useAppSelector";
import { useAppDispatch } from '@/hooks/redux/useAppDispatch';
import { searchEvent, clearSearch } from '@/redux/slices/calendarSlice';
import { searchSchedule, clearScheduleSearch } from '@/redux/slices/scheduleSlice';
import { CountryContainer, CountryDropdown } from './styles';
import { OptionsList, OptionLabel } from '../eventEditor/styles';
import { countries } from '@/utils/calendar';
import useIsSmallScreen from '@/hooks/common/useIsSmallScreen';
import { useOutsideClickClose } from "@/hooks/calendar/useOutsideClickClose";

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
  const [openMobileBar, setOpenMobileBar] = useState(false);
  const [openMobileFade, setOpenMobileFade] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const {isSmall, isVerySmall} = useIsSmallScreen();
  const searchListRef = useRef<HTMLDivElement | null>(null);
  const countryListRef = useRef<HTMLDivElement | null>(null);
  const monthYearListRef = useRef<HTMLDivElement | null>(null);

  const {justClosed: searchListClosed} = useOutsideClickClose({
                                                                ref: searchListRef,
                                                                onClose: () => {
                                                                  setSearchQuery("");
                                                                  setOpenSearchResult(false);
                                                                  dispatch(clearSearch()); 
                                                                },
                                                              });

  const {justClosed: countryListClosed} = useOutsideClickClose({
                                                                ref: countryListRef,
                                                                onClose: () => {
                                                                  setDropdownOpen(false); 
                                                                },
                                                              });

  const {justClosed: monthYearListClosed} = useOutsideClickClose({
                                                                ref: monthYearListRef,
                                                                onClose: () => {
                                                                  setOpenMonthYearSelector(false); 
                                                                },
                                                              });
                                                              
  
  const dispatch = useAppDispatch();
  const searchedEvents = useAppSelector((state) => state.calendar.searchedEvents);

  const handleActiveWeekMonthConversion = (weekMonthState: 'week' | 'month') => {
  setActiveWeekMonthConversion(weekMonthState);
  weekMonthConversion(weekMonthState); 
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if(activeWeekMonthConversion === 'month') {
      dispatch(searchEvent({searchQuery}));
    } else {
      dispatch(searchSchedule({searchQuery}));
    }
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
        {isSmall &&
          <CustomButton onClick={() => setOpenMobileFade(!openMobileFade)} variant="calendarDatePiker" style={{position:'absolute',fontSize:'100%',top:'7px', right:'25px', padding:'0px', background:'transparent'}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="12px" height="12px" viewBox="0 0 1024 1024" version="1.1">
            <path xmlns="http://www.w3.org/2000/svg" d="M320 89.6h640v76.8H320V89.6z m0 768h640v76.8H320v-76.8z m-256-768h128v76.8H64V89.6z m256 384h640v76.8H320V473.6z m-256 0h128v76.8H64V473.6z m0 384h128v76.8H64v-76.8z" fill="#FFFFFF"/>
            </svg>
          </CustomButton>
        }
        {
          isSmall && openMobileFade &&
          <div style={{backgroundColor:'#ffa64d', width:'100%', height:'6%', position:'absolute', top:'30px', marginLeft:'-10px', zIndex:'1000', display:'flex', justifyContent:'center'}}>
            <CalendarHeaderSection style={{justifyContent:'center', alignItems:'center', display:'flex'}}>
            <CustomButton variant="calendarHeaderUpDown" onClick={() => changeDate('previous')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" viewBox="0 0 1024 1024" version="1.1">
                <path d="M903.232 768l56.768-50.432L512 256l-448 461.568 56.768 50.432L512 364.928z" fill="#000000"/>
              </svg>
            </CustomButton>
            <CustomButton onClick={() => directDateChange(new Date())}>Today</CustomButton>
            <CustomButton variant="calendarHeaderUpDown" onClick={() => changeDate('next')} style={{marginLeft:'10px'}}>
              <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" viewBox="0 0 1024 1024" version="1.1">
                <path d="M903.232 256l56.768 50.432L512 768 64 306.432 120.768 256 512 659.072z" fill="#000000"/>
              </svg>
            </CustomButton>
          </CalendarHeaderSection>
          </div>
        }
        {
          isVerySmall && openMobileBar &&
          <MobileHeader>
             <>
                <SearchInput
                  type="text"
                  placeholder="Search events..."
                  name="title"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  required
                />
                {openSearchResult && searchQuery &&
                  <SearchResultContainer onClick={() => {setOpenSearchResult(false); setSearchQuery('');}} ref={searchListRef}>
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
                    <OptionsList ref={countryListRef}>
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
              </>
          </MobileHeader>
        }
        {!isSmall && 
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
        }

          <CalendarHeaderSection variant="center">
            <CustomButton variant="calendarDatePiker" onClick={() => setOpenMonthYearSelector(!openMonthYearSelector)}>
              {`${MonthsFullName[month]} ${year}`}
            </CustomButton>
            {openMonthYearSelector && 
              <MonthYearSelector
                refProp = {monthYearListRef}
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
            {isVerySmall &&
              <CustomButton variant="calendarDatePiker" onClick={() => setOpenMobileBar(!openMobileBar)} style={{backgroundColor:'white'}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="15px" height="15px" viewBox="0 0 1024 1024" version="1.1">
                  {!openMobileBar && <path xmlns="http://www.w3.org/2000/svg" d="M768 903.232l-50.432 56.768L256 512l461.568-448 50.432 56.768L364.928 512z" fill="#000000"/>}
                  {openMobileBar && <path xmlns="http://www.w3.org/2000/svg" d="M256 120.768L306.432 64 768 512l-461.568 448L256 903.232 659.072 512z" fill="#000000"/>}
                </svg>
              </CustomButton>
            }
            {!isVerySmall &&
              <>
                <SearchInput
                  type="text"
                  placeholder="Search events..."
                  name="title"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  required
                />
                {openSearchResult && searchQuery &&
                  <SearchResultContainer onClick={() => {setOpenSearchResult(false); setSearchQuery('');}} ref={searchListRef}>
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
                    <OptionsList ref={countryListRef}>
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
              </>
            }
          </CalendarHeaderSection>

      </CalendarHeaderContainer>
    </>
  );
}

export default CalendarHeader;