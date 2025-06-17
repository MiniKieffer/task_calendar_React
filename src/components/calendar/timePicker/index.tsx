import React, {forwardRef} from 'react';

import { TimePickerContainer, TimePickerSubSelector, TimePickerArrowButton, TimePickerLabel } from './styles';

interface TimePickerComponentProps {
  startHour: number;
  startMinute: number;
  endHour: number;
  endMinute: number;
  onStartHourChange: (direction: "up" | "down") => void;
  onStartMinuteChange: (direction: "up" | "down") => void;
  onEndHourChange: (direction: "up" | "down") => void;
  onEndMinuteChange: (direction: "up" | "down") => void;
  refProp: React.RefObject<HTMLDivElement | null>;
}

const TimePicker = forwardRef<HTMLDivElement, Omit<TimePickerComponentProps, 'refProp'>>( 
    ({startHour, startMinute, endHour, endMinute, onStartHourChange, onStartMinuteChange, onEndHourChange, onEndMinuteChange}, ref) => {
  
  return (
    <TimePickerContainer ref = {ref}>
      <TimePickerSubSelector>
        <TimePickerArrowButton onClick={() => onStartHourChange("up")}>
            <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" viewBox="0 0 1024 1024" version="1.1">
              <path d="M903.232 768l56.768-50.432L512 256l-448 461.568 56.768 50.432L512 364.928z" fill="#000000"/>
            </svg>
        </TimePickerArrowButton>
        <TimePickerLabel>{startHour}</TimePickerLabel>
        <TimePickerArrowButton onClick={() => onStartHourChange("down")}>
            <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" viewBox="0 0 1024 1024" version="1.1">
              <path d="M903.232 256l56.768 50.432L512 768 64 306.432 120.768 256 512 659.072z" fill="#000000"/>
            </svg>
        </TimePickerArrowButton>
        <TimePickerArrowButton onClick={() => onStartMinuteChange("up")}>
            <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" viewBox="0 0 1024 1024" version="1.1">
              <path d="M903.232 768l56.768-50.432L512 256l-448 461.568 56.768 50.432L512 364.928z" fill="#000000"/>
            </svg>
        </TimePickerArrowButton>
        <TimePickerLabel>{startMinute}</TimePickerLabel>
        <TimePickerArrowButton onClick={() => onStartMinuteChange("down")}>
            <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" viewBox="0 0 1024 1024" version="1.1">
              <path d="M903.232 256l56.768 50.432L512 768 64 306.432 120.768 256 512 659.072z" fill="#000000"/>
            </svg>
        </TimePickerArrowButton>
      </TimePickerSubSelector>
      <TimePickerSubSelector>
        <TimePickerArrowButton onClick={() => onEndHourChange("up")}>
            <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" viewBox="0 0 1024 1024" version="1.1">
              <path d="M903.232 768l56.768-50.432L512 256l-448 461.568 56.768 50.432L512 364.928z" fill="#000000"/>
            </svg>
        </TimePickerArrowButton>
        <TimePickerLabel>{endHour}</TimePickerLabel>
        <TimePickerArrowButton onClick={() => onEndHourChange("down")}>
            <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" viewBox="0 0 1024 1024" version="1.1">
              <path d="M903.232 256l56.768 50.432L512 768 64 306.432 120.768 256 512 659.072z" fill="#000000"/>
            </svg>
        </TimePickerArrowButton>
        <TimePickerArrowButton onClick={() => onEndMinuteChange("up")}>
            <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" viewBox="0 0 1024 1024" version="1.1">
              <path d="M903.232 768l56.768-50.432L512 256l-448 461.568 56.768 50.432L512 364.928z" fill="#000000"/>
            </svg>
        </TimePickerArrowButton>
        <TimePickerLabel>{endMinute}</TimePickerLabel>
        <TimePickerArrowButton onClick={() => onEndMinuteChange("down")}>
            <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" viewBox="0 0 1024 1024" version="1.1">
              <path d="M903.232 256l56.768 50.432L512 768 64 306.432 120.768 256 512 659.072z" fill="#000000"/>
            </svg>
        </TimePickerArrowButton>
      </TimePickerSubSelector>
    </TimePickerContainer>
  );
});

export default TimePicker;