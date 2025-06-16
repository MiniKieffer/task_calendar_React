import React, { useRef, useState, useEffect } from 'react';
import { useOutsideClickClose } from "@/hooks/calendar/useOutsideClickClose";
import { 
         CalendarGridContainer,  
         WeekGridCell
        } from "../styles";
import { Days } from "@/utils/calendar";
import useCalendarDates from "@/hooks/calendar/useCalendarDates";
import ScheduleEditor from '../../scheduleEditor';
import { useAppSelector } from '@/hooks/redux/useAppSelector';
import { useAppDispatch } from '@/hooks/redux/useAppDispatch';
import { cursorPointDetection } from "@/utils/calendar";
import { PopupPosition, Schedule } from '@/types/calendar';
import { moveSchedule, stretchSchedule } from '@/redux/slices/scheduleSlice';
import { ScheduleCell, ScheduleResizeHandler } from '../styles';

interface calendarWeekBodyComponentProps {
  displayDate: Date; 
  directDateChange: (data: Date) => void;
}

const BLOCK_HEIGHT = 10.25;
const BLOCK_COUNT = 96;

const CalendarWeekBody: React.FC<calendarWeekBodyComponentProps> = ({ displayDate, directDateChange }) => {
  const { timeZone, currentWeekDates, currentWeekDays } = useCalendarDates(displayDate);
  const dispatch = useAppDispatch();
  const [ editorOpen, setEditorOpen ] = useState<boolean>(false);
  const [ startTime, setStartTime ] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [editorPosition, setEditorPosition] = useState<PopupPosition | null>(null);
  const [editingSchedule, setEditingSchedule] = useState<Schedule | null>(null);
  const editorPopupRef = useRef<HTMLDivElement | null>(null);
  const schedules = useAppSelector((state) => state.schedule.schedules);
  const formatDate = (date: Date) => date.toLocaleDateString("en-CA");
  const editorClosedRef = useOutsideClickClose({
      ref: editorPopupRef,
      onClose: () => {
        setSelectedDate(null);
        setEditingSchedule(null);
        setEditorOpen(false);
    },
  });
  const parentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [schedule, setSchedule] = useState(
    Array.from({ length: 7 }, (_day, dayIndex) => 
      Array.from({ length: schedules[formatDate(currentWeekDays[dayIndex])]?.length }, (_event, scheduleIndex) => ({
        topIndex: schedules[formatDate(currentWeekDays[dayIndex])][scheduleIndex].startTime/15,
        heightBlocks: schedules[formatDate(currentWeekDays[dayIndex])][scheduleIndex].period/15,
        dragging: false,
        resizing: false,
    }))
  ));
  const pendingDispatchRef = useRef<{ dayIdx: number, scheduleIdx: number, startTime?: number, period?: number }[]>([]);

  useEffect(() => {
    const newSchedule = Array.from({ length: 7 }, (_day, dayIndex) =>
      Array.from(
        { length: schedules[formatDate(currentWeekDays[dayIndex])]?.length || 0 },
        (_event, scheduleIndex) => ({
          topIndex:
            schedules[formatDate(currentWeekDays[dayIndex])][scheduleIndex]
              .startTime / 15,
          heightBlocks:
            schedules[formatDate(currentWeekDays[dayIndex])][scheduleIndex]
              .period / 15,
          dragging: false,
          resizing: false,
        })
      )
    );

    setSchedule(newSchedule);
  }, [schedules, currentWeekDays]);


  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
  setSchedule((prev) =>
    prev.map((daySchedules, dayIdx) =>
      daySchedules.map((schedule, scheduleIdx) => {
        if (!schedule.dragging && !schedule.resizing) return schedule;

        const parent = parentRefs.current[dayIdx];
        if (!parent) return schedule;

        const rect = parent.getBoundingClientRect();
        const y = e.clientY - rect.top;

        if (schedule.dragging) {
          const newTop = Math.max(0, Math.min((BLOCK_COUNT - schedule.heightBlocks + 1) - 1, Math.round(y / BLOCK_HEIGHT)));

          // Record pending dispatch
          pendingDispatchRef.current.push({
            dayIdx,
            scheduleIdx,
            startTime: newTop * 15,
          });

          return { ...schedule, topIndex: newTop };
        } else if (schedule.resizing) {
          const newHeight = Math.max(
            1,
            Math.min((BLOCK_COUNT - schedule.heightBlocks + 1) - schedule.topIndex,
            Math.round((y - schedule.topIndex * BLOCK_HEIGHT) / BLOCK_HEIGHT))
          );

          pendingDispatchRef.current.push({
            dayIdx,
            scheduleIdx,
            period: newHeight * 15,
          });

          return { ...schedule, heightBlocks: newHeight };
        }

        return schedule;
      })
    )
  );
};

    const handleMouseUp = () => {
      setSchedule((prev) =>
        prev.map((daySchedules) =>
          daySchedules.map((schedule) => ({
            ...schedule,
            dragging: false,
            resizing: false,
          }))
        )
      );
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  useEffect(() => {
  for (const { dayIdx, scheduleIdx, startTime, period } of pendingDispatchRef.current) {
    const date = formatDate(currentWeekDays[dayIdx]);
    if (startTime !== undefined) {
      dispatch(moveSchedule({ date, scheduleIndex: scheduleIdx, startTime }));
    }
    if (period !== undefined) {
      dispatch(stretchSchedule({ date, scheduleIndex: scheduleIdx, period }));
    }
  }
  pendingDispatchRef.current = []; // clear after dispatching
});

  return (
    <>
      <CalendarGridContainer variant="calendarWeekDayBar">
        {editorOpen && selectedDate && editorPosition && startTime &&
          <ScheduleEditor 
            dateString = {selectedDate}
            initialData = {editingSchedule}
            onClose = {() => {setSelectedDate(null); setEditingSchedule(null); setEditorOpen(false);}}
            editorPosition = {editorPosition}
            ref = {editorPopupRef}
            directDateChange = {directDateChange}
            displayDate={displayDate}
            startTimer = {startTime}
          />
        }
        <WeekGridCell variant="timeZoneCell">{timeZone}</WeekGridCell>
        {Days.map((day, index) => (
          <WeekGridCell
            variant={
              currentWeekDates[index] === new Date().getDate() &&
              displayDate.getMonth() === new Date().getMonth() &&
              displayDate.getFullYear() === new Date().getFullYear()
                ? 'dayBarCellToday'
                : 'dayBarCell'
            }
            key={index}
          >
            {day} <br />
            {currentWeekDates[index]}
          </WeekGridCell>
        ))}
      </CalendarGridContainer>

      <CalendarGridContainer variant="calendarWeekBox">
        <div>
          {Array.from({ length: 24 }).map((_, index) => (
            <WeekGridCell variant="timeBarCell" key={index}>
              {(index + 1) > 12 ? (index + 1) - 12 : (index + 1)}
              {(index + 1) > 12 ? 'pm' : 'am'}
            </WeekGridCell>
          ))}
        </div>

        {currentWeekDates?.map((currentWeekDate, dayIndex) => {
          const dateString = formatDate(new Date(displayDate.getFullYear(), displayDate.getMonth(), currentWeekDate));
          const daySchedules = schedules[formatDate(currentWeekDays[dayIndex])] || [];
          return (
            <div
              key={dayIndex}
              style={{ position: 'relative' }}
              ref={(el) => {
                if (el) parentRefs.current[dayIndex] = el;
              }}
            >
              {Array.from({ length: 96 }).map((_, index) => (
                <WeekGridCell 
                  variant="weekCell" 
                  key={index} 
                  onClick={
                            (e) => {
                              if (editorClosedRef.current) return; 
                              setEditorPosition(cursorPointDetection(e)); 
                              setSelectedDate(dateString); 
                              setEditorOpen(true);
                              setStartTime(15 * index);
                            }
                          } 
                />
              ))}

              {schedule[dayIndex]?.map((oneSchedule, oneScheduleIdx) => (
                <ScheduleCell
                  key={oneScheduleIdx}
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    setSchedule((prev) => {
                      const updated = [...prev];
                      updated[dayIndex][oneScheduleIdx].dragging = true;
                      return updated;
                    })
                  }}
                  onClick={(e) => {
                    if (editorClosedRef.current) return; 
                    e.stopPropagation(); 
                    setEditorOpen(true); 
                    setSelectedDate(dateString); 
                    setEditorPosition(cursorPointDetection(e));
                    setStartTime(oneSchedule.topIndex * 15);
                    setEditingSchedule(daySchedules[oneScheduleIdx]);
                  }}
                  marginval = {oneScheduleIdx}
                  topval = {oneSchedule.topIndex * BLOCK_HEIGHT}
                  heightval = {oneSchedule.heightBlocks * BLOCK_HEIGHT}
                  cursorval = {oneSchedule.dragging ? "grabbing" : "grab"}
                >
                  {/* <div style={{textAlign:'center'}}>
                    {daySchedules?.[oneScheduleIdx]?.title}
                  </div> */}
                  {/* Resize handle */}
                  <ScheduleResizeHandler
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      setSchedule((prev) => {
                        const updated = [...prev];
                        updated[dayIndex][oneScheduleIdx].resizing = true;
                        return updated;
                      });
                    }}
                  />
                </ScheduleCell>
              ))}
            </div>
          );
        })}
      </CalendarGridContainer>
    </>
  );
};

export default CalendarWeekBody;