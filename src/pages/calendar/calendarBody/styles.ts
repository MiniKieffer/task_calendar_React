import styled, { css } from 'styled-components';

export const CalendarBodyContainer = styled.div`
  Height: calc(100vh - 100px)
`

export const CalendarGridContainer = styled.div<{ variant?: 'calendarDayBar' | 'calendarMainBox' }>`
  display: grid;
  grid-template-areas: 'myArea myArea myArea myArea myArea myArea myArea';

  ${(props) =>
    props.variant === 'calendarDayBar' &&
    css`
      height: 5%;
    `}

  ${(props) =>
    props.variant === 'calendarMainBox' &&
    css`
      gap: 5px;
      height: 95%;
    `}
`;

export const MonthGridCell = styled.div<{ variant?: 'dayBarCell' | 'thisMonthCell' |  'otherMonthCell'}>`
  padding: 5px;

  ${(props) =>
    props.variant === 'dayBarCell' &&
    css`
      display: flex;
      justify-content: center; 
      align-items: center;
      color: grey;
      font-weight: bold;
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
    `}

`;
