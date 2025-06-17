import React, { useRef, useState, useEffect } from 'react';
import { useOutsideClickClose } from "@/hooks/calendar/useOutsideClickClose";
import { 
         CalendarGridContainer,  
         WeekGridCell
        } from "../styles";
import { pad } from '@/utils/calendar';
import { Days } from "@/utils/calendar";
import useCalendarDates from "@/hooks/calendar/useCalendarDates";
import ScheduleEditor from '../../scheduleEditor';
import { useAppSelector } from '@/hooks/redux/useAppSelector';
import { useAppDispatch } from '@/hooks/redux/useAppDispatch';
import { cursorPointDetection } from "@/utils/calendar";
import { PopupPosition, Schedule } from '@/types/calendar';
import { moveSchedule } from '@/redux/slices/scheduleSlice';
import { ScheduleCell, ScheduleResizeHandler, SubScheduleCell, TypoBox } from '../styles';

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
  const [scheduleID, setScheduleID] = useState<number | null>(null);
  const [dayID, setDayID] = useState<number | null>(null);
  const [editorPosition, setEditorPosition] = useState<PopupPosition | null>(null);
  const [editingSchedule, setEditingSchedule] = useState<Schedule | null>(null);
  const editorPopupRef = useRef<HTMLDivElement | null>(null);
  const schedules = useAppSelector((state) => state.schedule.schedules);
  const [scheduleMoveMode, setScheduleMoveMode] = useState<boolean>(false);
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
            return { ...schedule, topIndex: newTop };
          } else if (schedule.resizing) {
            const newHeight = Math.max(
              2,
              Math.min(
                (BLOCK_COUNT - schedule.heightBlocks + 1) - schedule.topIndex,
                Math.round((y - schedule.topIndex * BLOCK_HEIGHT) / BLOCK_HEIGHT)
              )
            );
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
      setScheduleMoveMode(false);
  };
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
    if(selectedDate && scheduleID !== null && dayID !== null) {
        dispatch(moveSchedule({ date: selectedDate, scheduleIndex: scheduleID, startTime: schedule[dayID][scheduleID].topIndex * 15, period: schedule[dayID][scheduleID].heightBlocks * 15}));
    }
  },[scheduleMoveMode]);


  useEffect(() => {
    if(scheduleMoveMode) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [scheduleMoveMode]);

  

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
                  
                  // onClick={(e) => {
                  //   if (editorClosedRef.current) return; 
                  //   e.stopPropagation(); 
                  //   setEditorOpen(true); 
                  //   setSelectedDate(dateString); 
                  //   setEditorPosition(cursorPointDetection(e));
                  //   setStartTime(oneSchedule.topIndex * 15);
                  //   setEditingSchedule(daySchedules[oneScheduleIdx]);
                  // }}
                  marginval = {oneScheduleIdx}
                  topval = {oneSchedule.topIndex * BLOCK_HEIGHT}
                  heightval = {oneSchedule.heightBlocks * BLOCK_HEIGHT}
                  cursorval = {oneSchedule.dragging ? "grabbing" : "grab"}
                > 
                <SubScheduleCell 
                  onMouseDown={(e) =>{
                      e.stopPropagation(); 
                      setSelectedDate(dateString); 
                      setScheduleID(oneScheduleIdx);
                      setDayID(dayIndex);
                      setScheduleMoveMode(true);
                      setSchedule((prev) => {
                      const updated = [...prev];
                      updated[dayIndex][oneScheduleIdx].dragging = true;
                      return updated;
                    })
                  }}
                >
                    <TypoBox>
                       {`${Math.floor(daySchedules?.[oneScheduleIdx]?.startTime / 60)}.${pad(daySchedules?.[oneScheduleIdx]?.startTime % 60)} 
                        - ${Math.floor(daySchedules?.[oneScheduleIdx]?.endTime / 60)}.${pad(daySchedules?.[oneScheduleIdx]?.endTime % 60)}`}
                       {" "}
                       {daySchedules?.[oneScheduleIdx]?.title} 
                    </TypoBox>
                </SubScheduleCell>
                  
                  {/* Resize handle */}
                  <ScheduleResizeHandler
                    onMouseDown={(e) => {
                      setSelectedDate(dateString); 
                      setScheduleID(oneScheduleIdx);
                      setDayID(dayIndex);
                      e.stopPropagation();
                      setScheduleMoveMode(true);
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