import React, { useState, forwardRef, useEffect, useRef } from 'react';
import CustomButton from "@/components/common/customButton";
import {
  EditorPopup,
  Input,
  Textarea,
  ButtonGroup,
  Button, 
  OptionContainer,
  Dropdown,
  OptionsList,
  OptionLabel
} from './styles';
import { useOutsideClickClose } from "@/hooks/calendar/useOutsideClickClose";
import { useAppDispatch } from '@/hooks/redux/useAppDispatch';
import { EventData, PopupPosition } from '@/types/calendar';
import { updateEvent, addEvent, deleteEvent } from '@/redux/slices/calendarSlice';
import { nanoid } from '@reduxjs/toolkit';
import DatePicker from '../datePicker';

type EventEditorProps = {
  dateString: string;
  initialData?: EventData | null;
  onClose: () => void;
  editorPosition: PopupPosition;
  refProp: React.RefObject<HTMLDivElement | null>;
  directDateChange: (data: Date) => void;
  displayDate: Date;
};

const options = [
  { value: 'meeting', label: 'Meeting' },
  { value: 'party', label: 'Party' },
  { value: 'traveling', label: 'Traveling' },
  { value: 'dating', label: 'Dating' },
  { value: 'hiking', label: 'Hiking' },
  { value: 'task', label: 'Task' },
];

const EventEditor = forwardRef<HTMLDivElement, Omit<EventEditorProps, 'refProp'>>(
  ({ dateString, initialData, onClose, editorPosition, directDateChange, displayDate}, ref) => {
    const dispatch = useAppDispatch();
    const [title, setTitle] = useState(initialData?.title || "");
    const [desc, setDesc] = useState(initialData?.desc || "");
    const [style, setStyle] = useState(initialData?.event_style || []);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [datePickerOpen, setDatePickerOpen] = useState(false);
    const [year, setYear] = useState<number>(0);
    const [month, setMonth] = useState<number>(0);
    const [date, setDate] = useState<number>(0);
    const datePickerRef = useRef<HTMLDivElement | null>(null);
    const stylePickerRef = useRef<HTMLDivElement | null>(null);
    const {justClosed: timePickerClosed} = useOutsideClickClose({
              ref: datePickerRef,
              onClose: () => {
                setDatePickerOpen(false)
              },
            });
    const {justClosed: stylePickerClosed} = useOutsideClickClose({
              ref: stylePickerRef,
              onClose: () => {
                setDropdownOpen(false)
              },
            });

    const toggleValue = (value: string) => {
      setStyle(prev =>
        prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
      );
    };


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
      let eventData: EventData;
      if (initialData) {
        eventData = {
          ...initialData,
          title,
          desc,
          event_style: style,
          date: formatDate(fullDate),
        };
        dispatch(updateEvent({event: eventData, fromDate: dateString}));
      } else {
        eventData = {
          id: nanoid(),
          title,
          desc,
          event_style: style,
          date: formatDate(fullDate),
        };
        dispatch(addEvent(eventData));
      }
      directDateChange(fullDate);
      onClose();
    };

    return (
      <EditorPopup
        $top={editorPosition.y}
        $left={editorPosition.x}
        $transformOrigin={editorPosition.transformOrigin}
        $varient="editor"
        ref={ref} 
      >
        <CustomButton variant='datePicker' onClick={() => {setDatePickerOpen(!datePickerOpen);}}>{`${year}-${month}-${date}`}</CustomButton>
        {datePickerOpen && 
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
        <form onSubmit={handleSave}>
          <Input
            placeholder="Event Title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <OptionContainer>
            <Dropdown onClick={() => {setDropdownOpen(!dropdownOpen);}}>
              {style.length > 0 ? style.join(", ") : "Select options"}
            </Dropdown>
            {dropdownOpen && (
              <OptionsList  ref = {stylePickerRef}>
                {options.map((opt, id) => (
                  <OptionLabel key={id}>
                    <input
                      type="checkbox"
                      name="style"
                      checked={style.includes(opt.value)}
                      onChange={() => toggleValue(opt.value)}
                    />
                    {opt.label}
                  </OptionLabel>
                ))}
              </OptionsList>
            )}
          </OptionContainer>
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
                  dispatch(deleteEvent(initialData));
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
      </EditorPopup>
    );
  }
);

export default EventEditor;