import styled from 'styled-components';

export const EditorContainer = styled.div`
  position: absolute;
  top: 20%;
  left: 30%;
  background-color: white;
  border: 1px solid #ddd;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  padding: 24px;
  z-index: 100;
  width: 300px;
  border-radius: 12px;
`;

export const EditorTitle = styled.h3`
  margin-bottom: 16px;
  font-size: 18px;
  color: #333;
`;

export const Input = styled.input`
  width: 100%;
  padding: 8px 12px;
  margin-bottom: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
`;

export const Textarea = styled.textarea`
  width: 100%;
  padding: 8px 12px;
  height: 60px;
  margin-bottom: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Button = styled.button<{ variant?: 'cancel' }>`
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  background-color: ${({ variant }) =>
    variant === 'cancel' ? '#eee' : '#007bff'};
  color: ${({ variant }) => (variant === 'cancel' ? '#333' : '#fff')};

  &:hover {
    background-color: ${({ variant }) =>
      variant === 'cancel' ? '#ddd' : '#0056b3'};
  }
`;