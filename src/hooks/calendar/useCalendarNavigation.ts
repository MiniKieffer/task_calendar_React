import { useEffect } from 'react';

type Direction = 'next' | 'previous';
type Mode = 'month' | 'week';

export const useCalendarNavigation = (
  direction: Direction | '',
  setDirection: (v: Direction | '') => void,
  mode: Mode,
  displayDate: Date,
  setDisplayDate: (d: Date) => void
) => {
  useEffect(() => {
    if (!direction) return;

    const newDate = new Date(displayDate);

    if (mode === 'month') {
      if(displayDate.getMonth() === new Date().getMonth()) {
        newDate.setDate(new Date().getDate());
      } else {
        newDate.setDate(1);
      }
      newDate.setMonth(displayDate.getMonth() + (direction === 'next' ? 1 : -1));
    } else if (mode === 'week') {
      newDate.setDate(displayDate.getDate() + (direction === 'next' ? 7 : -7));
    }

    setDisplayDate(newDate);
    console.log(displayDate);
    setDirection('');
  }, [direction, mode, displayDate, setDisplayDate, setDirection]);
};