import styled, { css } from 'styled-components';

export const CalendarBodyContainer = styled.div`
  Height: calc(100vh - 80px);
  overflow: auto;
`

export const CalendarGridContainer = styled.div<{ variant?: 'calendarDayBar' | 'calendarMonthBox' | 'calendarWeekBox' | 'calendarWeekDayBar' }>`
  display: grid;
  

  ${(props) =>
    props.variant === 'calendarDayBar' &&
    css`
      grid-template-columns: repeat(7, 1fr);
      height: 6%;
    `}

  ${(props) =>
    props.variant === 'calendarMonthBox' &&
    css`
      grid-template-columns: repeat(7, 1fr);
      gap: 5px;
      height: 94%;
    `}

  ${(props) =>
    props.variant === 'calendarWeekDayBar' &&
    css`
      grid-template-columns: 0.5fr repeat(7, 1fr);
      height: 6%;
    `}
    
  ${(props) =>
    props.variant === 'calendarWeekBox' &&
    css`
      grid-template-columns: 0.5fr repeat(7, 1fr);
      gap: 5px;
      height: 94%;
    `}
`;

export const WeekGridCell = styled.div<{ variant?: 'dayBarCell' | 'timeBarCell' | 'weekCell' }>`
  padding: 5px;
  font-weight: bold;
  min-height: 10px;

  ${(props) =>
    props.variant === 'dayBarCell' &&
    css`
      display: flex;
      justify-content: center; 
      align-items: center;
      color: grey;
      padding-bottom: 20px;
      border-bottom: 5px solid #d9d9d9;
    `}

  ${(props) =>
    props.variant === 'timeBarCell' &&
    css`
      background-color: #d9d9d9;
      grid-column-gap: 0px;
    `}

  ${(props) =>
    props.variant === 'weekCell' &&
    css`
      background-color: #cccccc;
    `}
`

export const MonthGridCell = styled.div<{ variant?: 'dayBarCell' | 'thisMonthCell' |  'otherMonthCell' | 'todayCell'}>`
  padding: 5px;
  font-weight: bold;
  ${(props) =>
    props.variant === 'dayBarCell' &&
    css`
      display: flex;
      justify-content: center; 
      align-items: center;
      color: grey;
      padding-bottom: 20px;
      border-bottom: 5px solid #d9d9d9;
    `}

  ${(props) =>
    props.variant === 'thisMonthCell' &&
    css`
      background-color: #cccccc;
    `}

  ${(props) =>
    props.variant === 'otherMonthCell' &&
    css`
      background-color: #d9d9d9;
      color: grey;
    `}

 ${(props) =>
    props.variant === 'todayCell' &&
    css`
      background-color: #cccccc;
      border-top: 2px solid tomato;
    `}

`;
