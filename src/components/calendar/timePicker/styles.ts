import styled from "styled-components";

export const TimePickerContainer = styled.div`
    width:50%;
    top: 36%;
    left: 25%;
    background: #fff;
    position: absolute;
    margin-top: 4px;
    z-index: 10;
    max-height: 200px;
    display: flex;
    border: 1px solid black;
    align-items: center;
    flex-direction: column;
`
export const TimePickerSubSelector = styled.div`
    width:30%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f8f8f8;
    padding: 2px 5px;
`;

export const TimePickerArrowButton = styled.button`
    background: transparent;
    border: none;
    font-size: 15px;
    cursor: pointer;
     &:hover {
      background-color: gray;
    }

    &:active {
      transform: scale(0.97);
      background-color: gray;
    }
`;

export const TimePickerLabel = styled.div`
    font-weight: 500;
    font-size: 15px;
    min-width: 30%;
    text-align: center;
`;