import React from 'react';

import { TimePickerContainer, DatePickerSubSelector, DatePickerArrowButton, DatePickerLabel } from './styles';

interface TimePickerComponentProps {
  startHour: number;
  startMinute: number;
  endHour: number;
  endMinute: number;
  onStartHourChange: (direction: "up" | "down") => void;
  onStartMinuteChange: (direction: "up" | "down") => void;
  onEndHourChange: (direction: "up" | "down") => void;
  onEndMinuteChange: (direction: "up" | "down") => void;
}

const TimePicker: React.FC<TimePickerComponentProps> = ({startHour, startMinute, endHour, endMinute, onStartHourChange, onStartMinuteChange, onEndHourChange, onEndMinuteChange}) => {
  
  return (
    <TimePickerContainer>
      <DatePickerSubSelector>
        <DatePickerArrowButton onClick={() => onStartHourChange("up")}>
            <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" viewBox="0 0 1024 1024" version="1.1">
              <path d="M903.232 768l56.768-50.432L512 256l-448 461.568 56.768 50.432L512 364.928z" fill="#000000"/>
            </svg>
        </DatePickerArrowButton>
        <DatePickerLabel>{startHour}</DatePickerLabel>
        <DatePickerArrowButton onClick={() => onStartHourChange("down")}>
            <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" viewBox="0 0 1024 1024" version="1.1">
              <path d="M903.232 256l56.768 50.432L512 768 64 306.432 120.768 256 512 659.072z" fill="#000000"/>
            </svg>
        </DatePickerArrowButton>
      </DatePickerSubSelector>
      <DatePickerSubSelector>
        <DatePickerArrowButton onClick={() => onStartMinuteChange("up")}>
            <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" viewBox="0 0 1024 1024" version="1.1">
              <path d="M903.232 768l56.768-50.432L512 256l-448 461.568 56.768 50.432L512 364.928z" fill="#000000"/>
            </svg>
        </DatePickerArrowButton>
        <DatePickerLabel>{startMinute}</DatePickerLabel>
        <DatePickerArrowButton onClick={() => onStartMinuteChange("down")}>
            <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" viewBox="0 0 1024 1024" version="1.1">
              <path d="M903.232 256l56.768 50.432L512 768 64 306.432 120.768 256 512 659.072z" fill="#000000"/>
            </svg>
        </DatePickerArrowButton>
      </DatePickerSubSelector>
      <DatePickerSubSelector>
        <DatePickerArrowButton onClick={() => onEndHourChange("up")}>
            <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" viewBox="0 0 1024 1024" version="1.1">
              <path d="M903.232 768l56.768-50.432L512 256l-448 461.568 56.768 50.432L512 364.928z" fill="#000000"/>
            </svg>
        </DatePickerArrowButton>
        <DatePickerLabel>{endHour}</DatePickerLabel>
        <DatePickerArrowButton onClick={() => onEndHourChange("down")}>
            <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" viewBox="0 0 1024 1024" version="1.1">
              <path d="M903.232 256l56.768 50.432L512 768 64 306.432 120.768 256 512 659.072z" fill="#000000"/>
            </svg>
        </DatePickerArrowButton>
      </DatePickerSubSelector>
      <DatePickerSubSelector>
        <DatePickerArrowButton onClick={() => onEndMinuteChange("up")}>
            <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" viewBox="0 0 1024 1024" version="1.1">
              <path d="M903.232 768l56.768-50.432L512 256l-448 461.568 56.768 50.432L512 364.928z" fill="#000000"/>
            </svg>
        </DatePickerArrowButton>
        <DatePickerLabel>{endMinute}</DatePickerLabel>
        <DatePickerArrowButton onClick={() => onEndMinuteChange("down")}>
            <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" viewBox="0 0 1024 1024" version="1.1">
              <path d="M903.232 256l56.768 50.432L512 768 64 306.432 120.768 256 512 659.072z" fill="#000000"/>
            </svg>
        </DatePickerArrowButton>
      </DatePickerSubSelector>
    </TimePickerContainer>
  );
}

export default TimePicker;