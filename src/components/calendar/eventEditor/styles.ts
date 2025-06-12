import styled from "styled-components";

// Styled Components

export const EditorPopup = styled.div<{
  $top: number;
  $left: number;
  $transformOrigin: string;
}>`
  position: absolute;
  ${({ $top, $left, $transformOrigin }) => {
    switch ($transformOrigin) {
      case 'top left':
        return `
          top: ${$top}px;
          left: ${$left}px;
          transform: translate(0, 0);
        `;
      case 'top right':
        return `
          top: ${$top}px;
          right: ${$left}px;
          transform: translate(0, 0);
        `;
      case 'bottom left':
        return `
          bottom: ${$top}px;
          left: ${$left}px;
          transform: translate(0, 0);
        `;
      case 'bottom right':
        return `
          bottom: ${$top}px;
          right: ${$left}px;
          transform: translate(0, 0);
        `;
      default:
        return '';
    }
  }}
  
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2);
  width: 320px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  z-index: 1000;
`;

export const EditorTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
`;

export const Input = styled.input`
  box-sizing: border-box;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 14px;
  width: 100%;
  margin-bottom: 10px;
`;

export const OptionContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 10px;
`;


export const Dropdown = styled.div`
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 14px;
  cursor: pointer;
  background: #fff;
`;

export const OptionsList = styled.div`
  position: absolute;
  top: 100%;
  width: 100%;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-top: 4px;
  z-index: 10;
  max-height: 200px;
  overflow-y: auto;
`;

export const OptionLabel = styled.label`
  display: flex;
  align-items: center;
  padding: 8px;
  cursor: pointer;

  &:hover {
    background-color: #f2f2f2;
  }

  input {
    margin-right: 8px;
  }
`;

export const Textarea = styled.textarea`
  box-sizing: border-box;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 14px;
  width: 100%;
  resize: vertical;
  margin-bottom: 10px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

export const Button = styled.button<{ variant?: 'cancel' }>`
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background-color: ${({ variant }) => (variant === 'cancel' ? '#e0e0e0' : '#007bff')};
  color: ${({ variant }) => (variant === 'cancel' ? '#333' : '#fff')};
  font-weight: 500;

  &:hover {
    opacity: 0.9;
  }
`;