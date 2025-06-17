import styled from "styled-components";

export const MonthWeekSelectorContainer = styled.div`
    width:50%;
    top: 100%;
    background: #fff;
    position: absolute;
    border-radius: 8px;
    margin-top: 4px;
    z-index: 10;
    max-height: 200px;
    display: flex;
    flex-direction: column;
`
export const SubSelector = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f8f8;
  padding: 8px 12px;
  border-radius: 8px;
`;

export const ArrowButton = styled.button`
  background: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
`;

export const Label = styled.div`
  font-weight: 500;
  font-size: 16px;
  min-width: 80px;
  text-align: center;
`;