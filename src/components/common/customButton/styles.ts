import styled, { css } from 'styled-components';

export const StyledButton = styled.button<{ variant?: 'calenderHeaderWeekMonth' | 'calendarHeaderUpDown' | 'calendarDatePiker' | 'datePicker'; activestate?: 'active' | 'inactive';}>`
  border-radius: 3px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  &:hover {
    background-color: gray;
  }

  &:active {
    transform: scale(0.97);
    background-color: gray;
  }

  ${(props) =>
    props.variant === 'calenderHeaderWeekMonth' &&
    css`
      padding: 10px 10px;
      background-color:  ${props.activestate === 'active' ? 'gray' : '#d9d9d9'};;
      color: black;
      font-weight: bold;
      margin-left: 5px;
      font-size:70%;
    `}

  ${(props) =>
    props.variant === 'datePicker' &&
    css`
      background-color:  ${props.activestate === 'active' ? 'gray' : 'white'};;
      color: black;
      font-weight: bold;
      margin-left: 5px;
      font-size:120%;
      width: 50%;
      margin: auto;
    `}

  ${(props) =>
    props.variant === 'calendarHeaderUpDown' &&
    css`
      background-color: #d9d9d9;
      color: grey;
      margin-right: 5px;
      padding: 10px 12px;
    `}

  ${(props) =>
    props.variant === 'calendarDatePiker' &&
    css`
      background-color: #e6e6e6;
      color: black;
      font-size: 1.2rem;
      padding: 10px 12px;
      font-weight: bold;
      font-size:135%;
    `}
`;