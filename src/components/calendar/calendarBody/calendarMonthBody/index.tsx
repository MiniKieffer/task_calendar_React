import React, {useState} from "react";
import { 
         CalendarGridContainer, 
         CalendarBodyContainer, 
         MonthGridCell 
        } from "../styles";
import useCalendarDates from "@/hooks/calendar/useCalendarDates";
import { Days, Months } from "@/utils/calendar";

// type CalendarEvent = {
//   id: string;
//   text: string;
// };

// type CalendarEvents = Record<number, CalendarEvent[]>;

// const initialEvents: CalendarEvents = {
//   1: [{ id: 'e1', text: 'Meeting' }, { id: 'e2', text: 'Lunch' }],
//   2: [{ id: 'e3', text: 'Gym' }],
//   3: [],
//   4: [],
//   5: [],
//   6: [],
//   7: [],
// };

interface calendarMonthBodyComponentProps {
  displayDate: Date; 
}

const CalendarMonthBody: React.FC<calendarMonthBodyComponentProps> = ({ displayDate }) => {
  const { currentMonthDates, lastMonthDates, nextMonthDates } = useCalendarDates(displayDate);

//  const [events, setEvents] = useState<CalendarEvents>(initialEvents);
//   const [dragInfo, setDragInfo] = useState<{ day: number; index: number } | null>(null);

//   const handleDragStart = (day: number, index: number) => {
//     setDragInfo({ day, index });
//   };

//   const handleDrop = (targetDay: number, targetIndex: number | null) => {
//     if (!dragInfo) return;

//     const draggedEvent = events[dragInfo.day][dragInfo.index];
//     const newSourceList = [...events[dragInfo.day]];
//     newSourceList.splice(dragInfo.index, 1); // Remove from source

//     const newTargetList = [...events[targetDay]];
//     if (targetIndex === null) {
//       newTargetList.push(draggedEvent);
//     } else {
//       newTargetList.splice(targetIndex, 0, draggedEvent);
//     }

//     setEvents({
//       ...events,
//       [dragInfo.day]: newSourceList,
//       [targetDay]: newTargetList,
//     });

//     setDragInfo(null);
//   };

  return (
    <CalendarBodyContainer>
      <CalendarGridContainer variant="calendarDayBar">
        {Days.map((day, index) => (
          <MonthGridCell variant="dayBarCell" key={index}>
            {day}
          </MonthGridCell>
        ))}
      </ CalendarGridContainer>
      <CalendarGridContainer variant="calendarMonthBox">
        {lastMonthDates.map((date, index) => (
          <MonthGridCell variant="otherMonthCell" key={index}>
            {index === lastMonthDates.length - 1 && `${Months[displayDate.getMonth() === 0 ? 11 : displayDate.getMonth() - 1]} `}
            {date}
          </MonthGridCell>
        ))}
        {currentMonthDates.map((date, index) => (
          <MonthGridCell variant={(date === new Date().getDate() && (displayDate.toLocaleDateString() === new Date().toLocaleDateString())) ? "todayCell" : "thisMonthCell"} key={index}>
            {(date === 1 || index === currentMonthDates.length - 1) && `${Months[displayDate.getMonth()]} `}
            {date}
            {/* {events[date]?.map((event : any, index : number) => (
              <div
                key={event.id}
                draggable
                onDragStart={() => handleDragStart(date, index)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.stopPropagation();
                  handleDrop(date, index);
                }}
              >
                {event.text}
              </div>
            ))} */}
          </MonthGridCell>
        ))}
        {nextMonthDates.map((date, index) => (
          <MonthGridCell variant="otherMonthCell" key={index}>
            {(date === 1) && `${Months[displayDate.getMonth() === 11 ? 0 : displayDate.getMonth() + 1]} `}
            {date}
          </MonthGridCell>
        ))}
      </ CalendarGridContainer>
    </CalendarBodyContainer>
  );
}

export default CalendarMonthBody;