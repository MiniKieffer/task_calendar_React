export type Direction = 'next' | 'previous';
export type Mode = 'week' | 'month';

export type EventData = {
  id: string;
  date: string; // format: YYYY-MM-DD
  title: string;
  event_style: string[];
  desc: string;
};

export type CalendarState = {
  events: Record<string, EventData[]>;
  searchedEvents: EventData[];
};

export type PopupPosition = {
  x: number;
  y: number;
  transformOrigin: 'top left' | 'top right' | 'bottom left' | 'bottom right';
};

export type Holiday = {
  date: string; 
  localName: string;
  name: string;
  countryCode: string;
  fixed: boolean;
  global: boolean;
  counties: string[] | null;
  launchYear: number | null;
  type: string;
};

export type HolidayState = {
  allHolidays: Holiday[];
  filteredHolidays: Holiday[];
  loading: boolean;
  error: string | null;
};

export type Schedule = {
  id: string;
  date: string;
  startTime: number;
  endTime: number;
  period: number;
  title: string;
  desc: string;
};

export type ScheduleState ={
   schedules: Record<string, Schedule[]>;
   searchedSchedule: Schedule[];
};