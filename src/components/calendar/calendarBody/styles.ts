import styled, { css } from 'styled-components';

export const CalendarBodyContainer = styled.div`
  height: calc(100vh - 80px);
  @media (max-height: 750px) {
    height: 110vh;
  }
  @media (max-height: 700px) {
    height: 100vh;
  }
  @media (max-height: 450px) {
    height: 140vh;
  }
`

export const CalendarGridContainer = styled.div<{ variant?: 'calendarDayBar' | 'calendarMonthBox' | 'calendarWeekBox' | 'calendarWeekDayBar' | 'datePiker' }>`
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
      @media (max-height: 600px) {
        height: 60%;
      }
    `}

  ${(props) =>
    props.variant === 'calendarWeekDayBar' &&
    css`
      grid-template-columns: 0.5fr repeat(7, 1fr);
      margin-right: 14px;
    `}
    
  ${(props) =>
    props.variant === 'calendarWeekBox' &&
    css`
      grid-template-columns: 0.5fr repeat(7, 1fr);
      gap: 1px;
      height: 90%;
      overflow: auto;
    `}
  
  ${(props) =>
    props.variant === 'datePiker' &&
    css`
      grid-template-columns: repeat(7, 1fr);
    `}
  
`;

export const WeekGridCell = styled.div<{ variant?: 'dayBarCell' | 'timeBarCell' | 'weekCell' | 'timeZoneCell' | 'dayBarCellToday'}>`
  padding: 5px;
  font-weight: bold;
  

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
      min-height: 30px;
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
      min-height: 30px;
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
       min-height: 30px;
    `}

  ${(props) =>
    props.variant === 'weekCell' &&
    css`
      padding: 0px;
      font-weight: 3;
      background-color: #cccccc;
      margin-bottom: 0.25px;
      height: 10px;
    `}
`

export const MonthGridCell = styled.div<{ variant?: 'dayBarCell' | 'thisMonthCell' |  'otherMonthCell' | 'todayCell' | 'thisMonthCellDatePicker' | 'otherMonthCellDatePicker' | 'todayCellDatePicker'; rownum?: 4 | 5 | 6}>`
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
      border-radius: 5px;
    `}

  ${(props) =>
    props.variant === 'otherMonthCell' &&
    css`
      background-color: #d9d9d9;
      color: grey;
      height: calc(74vh/${props.rownum});
      border-radius: 5px;
    `}

 ${(props) =>
    props.variant === 'todayCell' &&
    css`
      background-color: #cccccc;
      border-top: 2px solid tomato;
      height: calc(74vh/${props.rownum});
      border-radius: 5px;
    `}

  ${(props) =>
    props.variant === 'thisMonthCellDatePicker' &&
    css`
      background-color: #cccccc;
      padding: 1px;
      font-weight: 3;
      cursor: pointer;
      font-size: 10px;
      &:hover {
        background-color: gray;
      }

      &:active {
        transform: scale(0.97);
        background-color: gray;
      }
    `}

  ${(props) =>
    props.variant === 'otherMonthCellDatePicker' &&
    css`
      background-color: #d9d9d9;
      color: grey;
      padding: 1px;
      font-weight: 3;
      cursor: pointer;
      font-size: 10px;
      &:hover {
        background-color: gray;
        color: white;
      }
      
      &:active {
        transform: scale(0.97);
        background-color: gray;
      }
    `}

 ${(props) =>
    props.variant === 'todayCellDatePicker' &&
    css`
      background-color: #cccccc;
      color: tomato;
      padding: 1px;
      font-weight: 3;
      font-size: 10px;
      cursor: pointer;
      &:hover {
        background-color: gray;
      }
      
      &:active {
        transform: scale(0.97);
        background-color: gray;
      }
    `}
`;

export const ScheduleCell = styled.div<{ marginval: number; topval: number; heightval:number; cursorval?: "grabbing" | "grab" }>`
      position: absolute;
      left: 0;
      right: 0;
      background: rgba(0, 120, 255, 0.3);
      border: 1px solid #007bff;
      ${(props) =>
      css`
        margin-left: calc(2px * ${props.marginval});
        top: ${props.topval}px;
        height: ${props.heightval}px;
        cursor: ${props.cursorval};
      `}
`;

export const ScheduleResizeHandler = styled.div`
       position: absolute;
       bottom: 0;
       left: 0;
       right: 0;
       height: 6px;
       background: #007bff;
       cursor: ns-resize;
`;

