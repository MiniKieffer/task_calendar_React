import React, { useEffect, useState, useRef } from "react";
import { useOutsideClickClose } from "@/hooks/calendar/useOutsideClickClose";
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
  directDateChange: (data: Date) => void;
}

const CalendarMonthBody: React.FC<CalendarMonthBodyProps> = ({ displayDate, directDateChange }) => {
  const { currentMonthDates, lastMonthDates, nextMonthDates } = useCalendarDates(displayDate);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [listDate, setListDate] = useState<string | null>(null);
  const [editingEvent, setEditingEvent] = useState<EventData | null>(null);
  const [listPopupOpenMode, setListPopupOpenMode] = useState<boolean>(false);
  const [editorPopupOpenMode, setEditorPopupOpenMode] = useState<boolean>(false);
  const [editorPosition, setEditorPosition] = useState<PopupPosition | null>(null);
  const [listPosition, setListPosition] = useState<PopupPosition | null>(null);
  const events = useAppSelector((state) => state.calendar.events) ?? {};
  const editorPopupRef = useRef<HTMLDivElement | null>(null);
  const listPopupRef = useRef<HTMLDivElement | null>(null);

  const { justClosed: editorClosed } = useOutsideClickClose({
    ref: editorPopupRef,
    onClose: () => {
      setSelectedDate(null);
      setEditingEvent(null);
      setEditorPopupOpenMode(false);
    },
  });
  const { justClosed: listClosed } = useOutsideClickClose({
    ref: listPopupRef,
    onClose: () => {
      setListDate(null);
      setEditingEvent(null);
      setListPopupOpenMode(false);
    },
  });

  const totalRows =
    (lastMonthDates.length + currentMonthDates.length + nextMonthDates.length) / 7 === 5 ? 5 : 
    (lastMonthDates.length + currentMonthDates.length + nextMonthDates.length) / 7 ===6 ? 6 : 4;

  return (
    <CalendarBodyContainer>
      {selectedDate && editorPosition && editorPopupOpenMode && (
        <EventEditor
          initialData={editingEvent}
          dateString={selectedDate}
          onClose={() => {
            setSelectedDate(null);
            setEditingEvent(null);
            setEditorPopupOpenMode(false);
          }}
          editorPosition={editorPosition}
          ref={editorPopupRef}
          directDateChange={directDateChange}
          displayDate = {displayDate}
        />
      )}
      {listDate && listPosition && listPopupOpenMode && (
        <DailyEventListModal
          handleCellClick = {(e) => { if(editorClosed || listClosed) return; 
                                      setEditorPosition(cursorPointDetection(e)); setSelectedDate(listDate);
                            }}
          onClose={() => {
            setSelectedDate(null);
            setEditingEvent(null);
            setListPopupOpenMode(false);
          }}
          events = {events}
          setEditingEvent = {setEditingEvent}
          dateString={listDate}
          listPosition={listPosition}
          setEditorPopupOpenMode = {setEditorPopupOpenMode}
          refProp={listPopupRef}
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
          const { dateString, variant, label, currentIdx } = calendarGridGenerateTool(displayDate, lastMonthDates, currentMonthDates, date, index, allDates);
          return (
            <EventCell 
              key = {currentIdx + dateString}
              variant = {variant}
              label = {label}
              rownum = {totalRows}
              handleCellClick = {(e: React.MouseEvent) => {
                                  setEditorPosition(cursorPointDetection(e));
                                  setSelectedDate(dateString);
                              }}
              events = {events}
              setEditingEvent = {setEditingEvent}
              setListPopupOpenMode = {setListPopupOpenMode}
              setEditorPopupOpenMode = {setEditorPopupOpenMode}
              handleListClick = {(e) => { setListPosition(cursorPointDetection(e)); setListDate(dateString); }}
              dateString = {dateString}
              cardNum = {`${events?.[dateString]?.length || ""} ${(events?.[dateString]?.length || 0) === 1 ? "card" : (events?.[dateString]?.length || 0) === 0 ? "" : "cards"}`}
              listCloseMode = {listClosed}
              editorCloseMode = {editorClosed}
            />
          );
        })}
      </CalendarGridContainer>
    </CalendarBodyContainer>
  );
};

export default CalendarMonthBody;
