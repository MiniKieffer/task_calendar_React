import styled from 'styled-components';

export const EventWrapper = styled.div`
  max-height: 143px;
  margin: auto;
  background-color: white;
  border-radius: 6px;
  font-weight: 4;
  font-size: 12px;
  padding: 6px;
  margin-top: 3px;
  z-index:300;
`

export const EventItem = styled.div<{ variant: string[] }>`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const EventBoxes = styled.div`
  display: flex;
  flex-wrap: nowrap;
  background-color: transparent;
  margin-bottom: 2px
`

export const EventBox = styled.div<{variant: string}>`
  background-color: ${({ variant }) =>
    variant === 'party'
      ? '#f39c12'
      : variant === 'meeting'
      ? '#2980b9'
      : '#7f8c8d'};
  width: 27px;
  height: 5px;
  border-radius: 2px;
  margin-right: 2%;
  line-height: 75px;
  font-size: 30px;
`