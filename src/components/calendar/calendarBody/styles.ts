import styled, { css } from 'styled-components';

export const CalendarBodyContainer = styled.div`
  Height: calc(100vh - 80px)
`

export const CalendarGridContainer = styled.div<{ variant?: 'calendarDayBar' | 'calendarMainBox' }>`
  display: grid;
  grid-template-columns: repeat(7, 1fr);

  ${(props) =>
    props.variant === 'calendarDayBar' &&
    css`
      height: 6%;
    `}

  ${(props) =>
    props.variant === 'calendarMainBox' &&
    css`
      gap: 5px;
      height: 94%;
    `}
`;

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
