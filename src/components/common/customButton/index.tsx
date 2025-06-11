import React from 'react';
import { StyledButton } from './styles';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'calenderHeaderWeekMonth' | 'calendarHeaderUpDown' | 'calendarDatePiker';
}

const CustomButton: React.FC<ButtonProps> = ({
  children,
  variant = 'calenderHeaderWeekMonth',
  ...rest
}) => {
  return (
    <StyledButton type="button" variant={variant} {...rest}>
      {children}
    </StyledButton>
  );
};

export default CustomButton;