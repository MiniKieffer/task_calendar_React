import React, { useState, forwardRef, useEffect, useRef } from 'react';
import CustomButton from "@/components/common/customButton";
import {
  ScheduleEditorPopup,
  Input,
  Textarea,
  ButtonGroup,
  Button, 
} from './styles';
import { useAppDispatch } from '@/hooks/redux/useAppDispatch';
import { Schedule, PopupPosition } from '@/types/calendar';
import { addSchedule, deleteSchedule, updateSchedule } from '@/redux/slices/scheduleSlice';
import { nanoid } from '@reduxjs/toolkit';
import DatePicker from '../datePicker';
import TimePicker from '../timePicker';
import { pad } from '@/utils/calendar';
import { useOutsideClickClose } from "@/hooks/calendar/useOutsideClickClose";

type EventEditorProps = {
  dateString: string;
  initialData?: Schedule | null;
  onClose: () => void;
  editorPosition: PopupPosition;
  refProp: React.RefObject<HTMLDivElement | null>;
  directDateChange: (data: Date) => void;
  displayDate: Date;
  startTimer: number;
  period: number;
};

const ScheduleEditor = forwardRef<HTMLDivElement, Omit<EventEditorProps, 'refProp'>>(
  ({ dateString, initialData, onClose, editorPosition, directDateChange, displayDate, startTimer, period}, ref) => {
    const dispatch = useAppDispatch();
    const [title, setTitle] = useState(initialData?.title || "");
    const [desc, setDesc] = useState(initialData?.desc || "");
    const [datePickerOpen, setDatePickerOpen] = useState(false);
    const [timePickerOpen, setTimePickerOpen] = useState(false);
    const [year, setYear] = useState(0);
    const [month, setMonth] = useState(0);
    const [date, setDate] = useState(0);
    const [startTime, setStartTime] = useState(startTimer);
    const [endTime, setEndTime] = useState(startTimer + period);
    const datePickerRef = useRef<HTMLDivElement | null>(null);
    const timePickerRef = useRef<HTMLDivElement | null>(null);
    const {justClosedRef: datePickerClosedRef} = useOutsideClickClose({
          ref: datePickerRef,
          onClose: () => {
            setDatePickerOpen(false)
        },
      });
    const {justClosedRef: timePickerClosedRef} = useOutsideClickClose({
          ref: timePickerRef,
          onClose: () => {
            setTimePickerOpen(false)
        },
      });

    const formatDate = (date: Date) => date.toLocaleDateString("en-CA");

    useEffect(() => {
      const [year, month, day] = dateString.split("-").map(Number);
      setYear(year);
      setMonth(month);
      setDate(day);
    },[]);
    
    const handleSave = (e: React.FormEvent) => {
      e.preventDefault(); // prevent form submission reload
      const fullDate = new Date(year, month - 1, date);
      let schedule: Schedule;
      if (initialData) {
        schedule = {
          ...initialData,
          title,
          desc,
          date: formatDate(fullDate),
          startTime,
          endTime,
          period: (endTime - startTime),
        };
        dispatch(updateSchedule({schedule: schedule, fromDate: dateString}));
      } else {
        schedule = {
          id: nanoid(),
          date: formatDate(fullDate),
          startTime,
          endTime,
          period: (endTime - startTime),
          title,
          desc,
        };
        dispatch(addSchedule(schedule));
      }
      directDateChange(fullDate);
      onClose();
    };

    return (
      <ScheduleEditorPopup
        $top={editorPosition.y}
        $left={editorPosition.x}
        $transformOrigin={editorPosition.transformOrigin}
        $varient="editor"
        ref={ref} 
      >
        <CustomButton variant='datePicker' onClick={() => setDatePickerOpen(!datePickerOpen)}>{`${year}-${month}-${date}`}</CustomButton>
        {
            datePickerOpen && 
            <DatePicker  
              ref = {datePickerRef}
              year={year}
              month={month}
              onYearChange={(dir) => setYear(y => dir === "next" ? y + 1 : y - 1)}
              onMonthChange={(dir) => setMonth(m => {
                if (dir === "next") return (m + 1) % 12;
                return (m + 11) % 12;
              })}
              displayDate = {displayDate}
              setDate = {setDate}
              currentDate = {date}
              setDatePickerOpen = {setDatePickerOpen}
            />
        }
        <CustomButton variant='datePicker' onClick={() => setTimePickerOpen(!timePickerOpen)}>{`${Math.floor(startTime / 60)}.${pad(startTime % 60)} - ${Math.floor(endTime / 60)}.${pad(endTime % 60)}`}</CustomButton>
        {
            timePickerOpen &&
            <TimePicker 
                ref = {timePickerRef}
                startHour = {Math.floor(startTime / 60)}
                startMinute = {startTime % 60}
                endHour = {Math.floor(endTime / 60)}
                endMinute = {endTime % 60}
                onStartHourChange = {(dir) => setStartTime(t => dir === "up" ? ((endTime - t > 60 && Math.floor(t / 60) < 23) ? t + 60 : t) : (Math.floor(t / 60) > 0 ? t - 60 : t))}
                onStartMinuteChange = {(dir) => setStartTime(t => dir === "up" ? ((endTime - t > 30 && Math.floor(t / 15) < 95) ? t + 15 : t) : (Math.floor(t / 15) > 0 ? t - 15 : t))}
                onEndHourChange = {(dir) => setEndTime(t => dir === "up" ? (Math.floor(t / 60) < 23 ? t + 60 : t) : ((t - startTime > 60 && Math.floor(t / 60) > 0) ? t - 60 : t))}
                onEndMinuteChange = {(dir) => setEndTime(t => dir === "up" ? (Math.floor(t / 15) < 95 ? t + 15 : t) : ((t - startTime > 30 && Math.floor(t / 15) > 0) ? t - 15 : t))}
            />
        }
        <form onSubmit={handleSave}>
          <Input
            placeholder="Event Title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <Textarea
            placeholder="Description"
            name="description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <ButtonGroup>
            {initialData && (
              <Button
                variant="delete"
                onClick={() => {
                  dispatch(deleteSchedule(initialData));
                  onClose();
                }}
              >
                Delete
              </Button>
            )}
            <Button type="submit">Save</Button>
            <Button type="button" variant="cancel" onClick={onClose}>
              Cancel
            </Button>
          </ButtonGroup>
        </form>
      </ScheduleEditorPopup>
    );
  }
);

export default ScheduleEditor;