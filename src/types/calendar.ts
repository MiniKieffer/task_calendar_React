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
};

export type PopupPosition = {
  x: number;
  y: number;
  transformOrigin: 'top left' | 'top right' | 'bottom left' | 'bottom right';
};