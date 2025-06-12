import { useEffect } from 'react';

export const useAutoTodayUpdater = (onDayChange: () => void, currentDate: Date) => {
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (new Date().toDateString() !== currentDate.toDateString()) {
        onDayChange();
      }
    }, 60000);

    return () => clearInterval(intervalId);
  }, [currentDate, onDayChange]);
};