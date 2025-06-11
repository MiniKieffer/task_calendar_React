import styled, { css } from 'styled-components';

export const CalendarHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width:100%;
  height: 50px;
`;

export const CalendarHeaderSection = styled.div<{ variant?: 'center' | 'right' }>`
  width:20%;

  ${(props) =>
    props.variant === 'center' &&
    css`
      display: flex;
      justify-content: center;
    `}
  ${(props) =>
   props.variant === 'right' &&
   css`
     display: flex;
     justify-content: flex-end;
   `}
`;

