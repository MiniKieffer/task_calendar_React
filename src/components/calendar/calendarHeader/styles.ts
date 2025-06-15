import styled, { css } from 'styled-components';

export const CalendarHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width:100%;
  height: 50px;
`;

export const CalendarHeaderSection = styled.div<{ variant?: 'center' | 'right' }>`
  width:30%;

  ${(props) =>
    props.variant === 'center' &&
    css`
      display: flex;
      justify-content: center;
      position: relative;
    `}
  ${(props) =>
   props.variant === 'right' &&
   css`
     display: flex;
     justify-content: flex-end;
     position: relative;
   `}
`;

export const SearchInput = styled.input`
  box-sizing: border-box;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 10px;
  width: 100%;
  position: relative;
`;

export const SearchResultContainer = styled.div`
    width:60%;
    top: 100%;
    left: 0px;
    background: #fff;
    position: absolute;
    border-radius: 8px;
    margin-top: 4px;
    z-index: 10;
    max-height: 200px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    font-size: 11px;
    text-align: center;
`
export const SearchResultSubSelector = styled.div`
  display: flex;
  align-items: center;
  font-size: 11px;
  background: #f8f8f8;
  padding: 3px 12px;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background-color: gray;
  }

  &:active {
    transform: scale(0.97);
    background-color: gray;
  }
`;

export const CountryContainer = styled.div`
  box-sizing: border-box;
  position: relative;
  width: 100%;
  font-size: 10px
`;

export const CountryDropdown = styled.div`
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 10px;
  cursor: pointer;
  background: #fff;
`;

