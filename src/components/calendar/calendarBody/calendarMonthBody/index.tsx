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
import { EventData, PopupPosition } from "@/types/calendar";
import { cursorPointDetection, calendarGridGenerateTool } from "@/utils/calendar";
import DailyEventListModal from "../../dailyEventListModal";

interface CalendarMonthBodyProps {
  displayDate: Date;
}

const CalendarMonthBody: React.FC<CalendarMonthBodyProps> = ({ displayDate }) => {
  const { currentMonthDates, lastMonthDates, nextMonthDates } = useCalendarDates(displayDate);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [listDate, setListDate] = useState<string | null>(null);
  const [editingEvent, setEditingEvent] = useState<EventData | null>(null);
  const [listPopupOpenMode, setListPopupOpenMode] = useState<boolean>(false);
  const [editorPopupOpenMode, setEditorPopupOpenMode] = useState<boolean>(false);
  const [editorPosition, setEditorPosition] = useState<PopupPosition | null>(null);
  const [listPosition, setListPosition] = useState<PopupPosition | null>(null);
  const events = useAppSelector((state) => state.calendar.events);

  const totalRows =
    (lastMonthDates.length + currentMonthDates.length + nextMonthDates.length) / 7 === 5 ? 5 : 6;

  return (
    <CalendarBodyContainer>
      {selectedDate && editorPosition && editorPopupOpenMode && (
        <EventEditor
          initialData={editingEvent}
          date={selectedDate}
          onClose={() => {
            setSelectedDate(null);
            setEditingEvent(null);
            setEditorPopupOpenMode(false);
          }}
          editorPosition={editorPosition}
        />
      )}
      {listDate && listPosition && listPopupOpenMode && (
        <DailyEventListModal
          handleCellClick = {(e) => {setEditorPosition(cursorPointDetection(e)); setSelectedDate(listDate);}}
          onClose={() => {
            setSelectedDate(null);
            setEditingEvent(null);
            setListPopupOpenMode(false);
          }}
          events = {events}
          setEditingEvent = {setEditingEvent}
          date={listDate}
          listPosition={listPosition}
          setEditorPopupOpenMode = {setEditorPopupOpenMode}
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
              handleCellClick = {(e) => {setEditorPosition(cursorPointDetection(e)); setSelectedDate(dateString); }}
              events = {events}
              setEditingEvent = {setEditingEvent}
              setListPopupOpenMode = {setListPopupOpenMode}
              setEditorPopupOpenMode = {setEditorPopupOpenMode}
              handleListClick = {(e) => {setListPosition(cursorPointDetection(e)); setListDate(dateString); }}
              dateString = {dateString}
            />
          );
        })}
      </CalendarGridContainer>
    </CalendarBodyContainer>
  );
};

export default CalendarMonthBody;
