export type Direction = 'next' | 'previous';
export type Mode = 'week' | 'month';

export type EventData = {
  date: string; // format: YYYY-MM-DD
  title: string;
  event_style: string;
  desc: string;
};

export type CalendarState = {
  events: Record<string, EventData[]>;
};