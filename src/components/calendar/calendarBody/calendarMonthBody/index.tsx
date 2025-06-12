import React, {useEffect, useState} from "react";
import { 
         CalendarGridContainer, 
         CalendarBodyContainer, 
         MonthGridCell,
         EventItem
        } from "../styles";
import useCalendarDates from "@/hooks/calendar/useCalendarDates";
import { Days, Months } from "@/utils/calendar";
import { useAppDispatch } from "@/hooks/redux/useAppDispatch";
import { useAppSelector } from "@/hooks/redux/useAppSelector";
import { moveEvent, reorderEventWithinDay } from "@/redux/slices/calendarSlice";
import EventEditor from "../../eventEditor";
import { EventData, EditorPosition } from "@/types/calendar";

interface calendarMonthBodyComponentProps {
  displayDate: Date; 
}

const CalendarMonthBody: React.FC<calendarMonthBodyComponentProps> = ({ displayDate }) => {
  const { currentMonthDates, lastMonthDates, nextMonthDates } = useCalendarDates(displayDate);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [editingEvent, setEditingEvent] = useState<EventData | null>(null);
  const dispatch = useAppDispatch();
  const events = useAppSelector(state => state.calendar.events);

  const [editorPosition, setEditorPosition] = useState<EditorPosition | null>(null);

  const handleCellClick = (e: React.MouseEvent, date: string) => {
    let { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;

    let transformOrigin: 'top left' | 'top right' | 'bottom left' | 'bottom right' = 'top left';

    if (clientX > innerWidth / 2 && clientY < innerHeight / 2) {
      transformOrigin = "top right"; // right top → editor to left bottom
      clientX = innerWidth - clientX;
    } else if (clientX <= innerWidth / 2 && clientY < innerHeight / 2) {
      transformOrigin = "top left"; // left top → editor to right bottom
    } else if (clientX <= innerWidth / 2 && clientY >= innerHeight / 2) {
      transformOrigin = "bottom left"; // left bottom → editor to right top
      clientY = innerHeight - clientY;
    } else {
      transformOrigin = "bottom right";
      clientX = innerWidth - clientX; 
      clientY = innerHeight - clientY;
    }

    setEditorPosition({
      x: clientX,
      y: clientY,
      transformOrigin,
    });

    setSelectedDate(date); // open editor with the clicked date
  };

  useEffect(() => {
    console.log(events);
  },[events])

  const formatDate = (date: Date) =>
    date.toISOString().split('T')[0]; // e.g., "2025-06-13"

  return (
    <CalendarBodyContainer>
      {selectedDate && editorPosition && (
        <EventEditor
          initialData={editingEvent}
          date={selectedDate}
          onClose={() => {
            setSelectedDate(null);
            setEditingEvent(null);
          }}
          editorPosition={editorPosition}
        />
      )}
      <CalendarGridContainer variant="calendarDayBar">
        {Days.map((day, index) => (
          <MonthGridCell variant="dayBarCell" key={index}>
            {day}
          </MonthGridCell>
        ))}
      </ CalendarGridContainer>
      <CalendarGridContainer variant="calendarMonthBox">
        {lastMonthDates.map((date, index) => {
        const year = displayDate.getMonth() === 0 ? displayDate.getFullYear() - 1 : displayDate.getFullYear();
        const month = displayDate.getMonth() === 0 ? 11 : displayDate.getMonth() - 1;
        const fullDate = new Date(year, month, date);
        const dateString = formatDate(fullDate);
        const dayEvents = events[dateString] || [];
        return (
          <MonthGridCell 
              variant="otherMonthCell" 
              key={`prev-${index}`} 
              onClick={(e) => handleCellClick(e, dateString)}
              onDragOver={(e) => e.preventDefault()} // Allow drop
              onDrop={(e) => {
                const data = e.dataTransfer.getData("text/plain");
                const { event, fromDate } = JSON.parse(data);
                const toDate = formatDate(fullDate);

                if (fromDate === toDate) return;
                dispatch(moveEvent({ event, fromDate, toDate }));
              }}
          >
            {index === lastMonthDates.length - 1 && `${Months[displayDate.getMonth() === 0 ? 11 : displayDate.getMonth() - 1]} `}
            {date}
            {dayEvents.map((event, i) => (
              <div
                key={i}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault(); 
                  const data = JSON.parse(e.dataTransfer.getData("text/plain"));
                  const { fromDate, fromIndex } = data;
                  const toDate = dateString;
                  const toIndex = i;
                
                  // Reorder within same date
                  if (fromDate === toDate && fromIndex !== toIndex) {
                    dispatch(reorderEventWithinDay({ date: toDate, fromIndex, toIndex }));
                  }
                }}
              >
                <EventItem
                  variant={event.event_style}
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData(
                      "text/plain",
                      JSON.stringify({ event, fromDate: dateString, fromIndex: i })
                    );
                  }}
                  onClick={(e) => {
                    handleCellClick(e, dateString);       
                    setEditingEvent(event);          
                  }}
                >
                  {event.title}
                </EventItem>
              </div>
            ))}
              </MonthGridCell>
        )})}

        {currentMonthDates.map((date, index) => {
          const year = displayDate.getFullYear();
          const month = displayDate.getMonth();
          const fullDate = new Date(year, month, date);
          const dateString = formatDate(fullDate);
          const dayEvents = events[dateString] || [];
          return (
          <MonthGridCell 
            onClick={(e) => handleCellClick(e, dateString)} 
            variant={(date === new Date().getDate() && (displayDate.toLocaleDateString() === new Date().toLocaleDateString())) ? "todayCell" : "thisMonthCell"} 
            key={index}
            onDragOver={(e) => e.preventDefault()} // Allow drop
            onDrop={(e) => {
              const data = e.dataTransfer.getData("text/plain");
              const { event, fromDate } = JSON.parse(data);
              const toDate = formatDate(fullDate);
              if (fromDate === toDate) return;
              dispatch(moveEvent({ event, fromDate, toDate }));
            }}
          >
            {(date === 1 || index === currentMonthDates.length - 1) && `${Months[displayDate.getMonth()]} `}
            {date}
            {dayEvents.map((event, i) => (
              <div
                key={i}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault(); 
                  const data = JSON.parse(e.dataTransfer.getData("text/plain"));
                  const { fromDate, fromIndex } = data;
                  const toDate = dateString;
                  const toIndex = i;
                
                  // Reorder within same date
                  if (fromDate === toDate && fromIndex !== toIndex) {
                    dispatch(reorderEventWithinDay({ date: toDate, fromIndex, toIndex }));
                  }
                }}
              >
                <EventItem
                  variant={event.event_style}
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData(
                      "text/plain",
                      JSON.stringify({ event, fromDate: dateString, fromIndex: i })
                    );
                  }}
                  onClick={(e) => {
                    handleCellClick(e, dateString);       
                    setEditingEvent(event);          
                  }}
                >
                  {event.title}
                </EventItem>
              </div>
            ))}
          </MonthGridCell>
        )})}

        {nextMonthDates.map((date, index) => {
          const year = displayDate.getMonth() === 11 ? displayDate.getFullYear() + 1 : displayDate.getFullYear();
          const month = displayDate.getMonth() === 11 ? 0 : displayDate.getMonth() + 1;
          const fullDate = new Date(year, month, date);
          const dateString = formatDate(fullDate);
          const dayEvents = events[dateString] || [];
          return(
          <MonthGridCell 
            onClick={(e) => handleCellClick(e, dateString)} 
            variant="otherMonthCell" 
            key={`next-${index}`}
            onDragOver={(e) => e.preventDefault()} // Allow drop
            onDrop={(e) => {
              const data = e.dataTransfer.getData("text/plain");
              const { event, fromDate } = JSON.parse(data);
              const toDate = formatDate(fullDate);
              if (fromDate === toDate) return;
              dispatch(moveEvent({ event, fromDate, toDate }));
            }}
          >
            {(date === 1) && `${Months[displayDate.getMonth() === 11 ? 0 : displayDate.getMonth() + 1]} `}
            {date}
            {dayEvents.map((event, i) => (
              <div
                key={i}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault(); 
                  const data = JSON.parse(e.dataTransfer.getData("text/plain"));
                  const { fromDate, fromIndex } = data;
                  const toDate = dateString;
                  const toIndex = i;
                
                  // Reorder within same date
                  if (fromDate === toDate && fromIndex !== toIndex) {
                    dispatch(reorderEventWithinDay({ date: toDate, fromIndex, toIndex }));
                  }
                }}
              >
                <EventItem
                  variant={event.event_style}
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData(
                      "text/plain",
                      JSON.stringify({ event, fromDate: dateString, fromIndex: i })
                    );
                  }}
                  onClick={(e) => {
                    handleCellClick(e, dateString);       
                    setEditingEvent(event);          
                  }}
                >
                  {event.title}
                </EventItem>
              </div>
          ))}
          </MonthGridCell>
        )})}
      </ CalendarGridContainer>
    </CalendarBodyContainer>
  );
}

export default CalendarMonthBody;