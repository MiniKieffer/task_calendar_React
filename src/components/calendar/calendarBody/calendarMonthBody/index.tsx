import React, { useState } from "react";
import {
  CalendarGridContainer,
  CalendarBodyContainer,
  MonthGridCell
} from "../styles";
import useCalendarDates from "@/hooks/calendar/useCalendarDates";
import { Days } from "@/utils/calendar";
import { useAppSelector } from "@/hooks/redux/useAppSelector";
import EventEditor from "../../eventEditor";
import EventCell from "../../eventCell";
import { EventData, EditorPosition } from "@/types/calendar";
import { handleCellClick, calendarGridGenerateTool } from "@/utils/calendar";

interface CalendarMonthBodyProps {
  displayDate: Date;
}

const CalendarMonthBody: React.FC<CalendarMonthBodyProps> = ({ displayDate }) => {
  const { currentMonthDates, lastMonthDates, nextMonthDates } = useCalendarDates(displayDate);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [editingEvent, setEditingEvent] = useState<EventData | null>(null);
  const [editorPosition, setEditorPosition] = useState<EditorPosition | null>(null);
  const events = useAppSelector((state) => state.calendar.events);

  const totalRows =
    (lastMonthDates.length + currentMonthDates.length + nextMonthDates.length) / 7 === 5 ? 5 : 6;

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
      </CalendarGridContainer>
      <CalendarGridContainer variant="calendarMonthBox">
        {[...lastMonthDates, ...currentMonthDates, ...nextMonthDates].map((date, index, allDates) => {
          const { dateString, variant, label, currentIdx } = calendarGridGenerateTool(displayDate, lastMonthDates, currentMonthDates, nextMonthDates, date, index, allDates);
          return (
            <EventCell 
              key = {currentIdx + dateString}
              variant = {variant}
              label = {label}
              rownum = {totalRows}
              handleCellClick = {(e) => handleCellClick(e, dateString, setEditorPosition, setSelectedDate)}
              events = {events}
              setEditingEvent = {setEditingEvent}
              dateString = {dateString}
            />
          );
        })}
      </CalendarGridContainer>
    </CalendarBodyContainer>
  );
};

export default CalendarMonthBody;
