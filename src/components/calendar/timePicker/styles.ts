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
    flex-direction: column;
    border: 1px solid black;
    align-items: center;
`
export const DatePickerSubSelector = styled.div`
    width:25%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f8f8f8;
    padding: 2px 5px;
`;

export const DatePickerArrowButton = styled.button`
    background: transparent;
    border: none;
    font-size: 10px;
    cursor: pointer;
`;

export const DatePickerLabel = styled.div`
    font-weight: 500;
    font-size: 10px;
    min-width: 80px;
    text-align: center;
`;