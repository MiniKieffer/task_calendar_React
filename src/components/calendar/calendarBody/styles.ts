import styled, { css } from 'styled-components';

export const CalendarBodyContainer = styled.div`
  height: calc(100vh - 80px);
`

export const CalendarGridContainer = styled.div<{ variant?: 'calendarDayBar' | 'calendarMonthBox' | 'calendarWeekBox' | 'calendarWeekDayBar' }>`
  display: grid;
  

  ${(props) =>
    props.variant === 'calendarDayBar' &&
    css`
      grid-template-columns: repeat(7, 1fr);  
      margin-bottom: 10px;
    `}

  ${(props) =>
    props.variant === 'calendarMonthBox' &&
    css`
      grid-template-columns: repeat(7, calc((100vw - 50px) / 7));
      gap: 5px;
      height: 90%;
    `}

  ${(props) =>
    props.variant === 'calendarWeekDayBar' &&
    css`
      grid-template-columns: 0.5fr repeat(7, 1fr);
    `}
    
  ${(props) =>
    props.variant === 'calendarWeekBox' &&
    css`
      grid-template-columns: 0.5fr repeat(7, 1fr);
      gap: 1px;
      height: 90%;
      overflow: auto;
    `}
`;

export const WeekGridCell = styled.div<{ variant?: 'dayBarCell' | 'timeBarCell' | 'weekCell' | 'timeZoneCell' | 'dayBarCellToday'}>`
  padding: 5px;
  font-weight: bold;
  min-height: 30px;

  ${(props) =>
    props.variant === 'dayBarCell' &&
    css`
      display: flex;
      justify-content: center; 
      align-items: center;
      text-align: center;
      color: grey;
      border-bottom: 5px solid #d9d9d9;
    `}

  ${(props) =>
    props.variant === 'dayBarCellToday' &&
    css`
      display: flex;
      justify-content: center; 
      align-items: center;
      text-align: center;
      color: grey;
      border-bottom: 5px solid #d9d9d9;
      color: tomato;
    `}

  ${(props) =>
    props.variant === 'timeZoneCell' &&
    css`
      border-bottom: 5px solid #d9d9d9;
      font-weight: 300;
      font-size: 12px;
      display: flex;
      justify-content: flex-end;
      align-items: flex-end; 
    `}

  ${(props) =>
    props.variant === 'timeBarCell' &&
    css`
      background-color: #d9d9d9;
       border-bottom: 1px solid black;
       font-weight: 300;
       font-size: 12px;
       display: flex;
       justify-content: flex-end;
       align-items: flex-end; 
    `}

  ${(props) =>
    props.variant === 'weekCell' &&
    css`
      background-color: #cccccc;
    `}
`

export const MonthGridCell = styled.div<{ variant?: 'dayBarCell' | 'thisMonthCell' |  'otherMonthCell' | 'todayCell'; rownum?: 5 | 6}>`
  padding: 5px;
  font-weight: bold;
  ${(props) =>
    props.variant === 'dayBarCell' &&
    css`
      display: flex;
      justify-content: center; 
      align-items: center;
      color: grey;
      padding-bottom: 10px;
      border-bottom: 5px solid #d9d9d9;
    `}

  ${(props) =>
    props.variant === 'thisMonthCell' &&
    css`
      background-color: #cccccc;
      height: calc(74vh/${props.rownum});
    `}

  ${(props) =>
    props.variant === 'otherMonthCell' &&
    css`
      background-color: #d9d9d9;
      color: grey;
      height: calc(74vh/${props.rownum});
    `}

 ${(props) =>
    props.variant === 'todayCell' &&
    css`
      background-color: #cccccc;
      border-top: 2px solid tomato;
      height: calc(74vh/${props.rownum});
    `}
`;

