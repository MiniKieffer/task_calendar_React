import styled, { css } from 'styled-components';

export const StyledButton = styled.button<{ variant?: 'calenderHeaderWeekMonth' | 'secondary' }>`
  padding: 10px 20px;
  border-radius: 3px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;

  ${(props) =>
    props.variant === 'calenderHeaderWeekMonth' &&
    css`
      background-color: darkgray;
      color: black;
      font-weight: bold;

      &:hover {
        background-color: grey;
      }

      &:active {
        transform: scale(0.97);
      }
    `}

  ${(props) =>
    props.variant === 'secondary' &&
    css`
      background-color: white;
      color: blue;
      border: 2px solid blue;

      &:hover {
        background-color: lightblue;
      }

      &:active {
        transform: scale(0.97);
      }
    `}
`;