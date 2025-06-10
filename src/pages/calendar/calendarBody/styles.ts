import styled, { css } from 'styled-components';

export const CalendarGridContainer = styled.div<{ variant?: 'calendarDayBar' | 'calendarMainBox' }>`
  display: grid;
  grid-template-areas: 'myArea myArea myArea myArea myArea myArea myArea';

  ${(props) =>
    props.variant === 'calendarDayBar' &&
    css`
      height: 20px;
    `}

  ${(props) =>
    props.variant === 'calendarMainBox' &&
    css`
      gap: 5px;
      height: 100%;
    `}
`;
