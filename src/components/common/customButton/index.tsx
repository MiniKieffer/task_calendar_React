import React from 'react';
import { StyledButton } from './styles';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'calenderHeaderWeekMonth' | 'calendarHeaderUpDown' | 'calendarDatePiker' | 'datePicker';
  activestate?: 'active' | 'inactive';
}

const CustomButton: React.FC<ButtonProps> = ({
  children,
  variant = 'calenderHeaderWeekMonth',
   activestate,
  ...rest
}) => {
  return (
    <StyledButton type="button" variant={variant} activestate={activestate} {...rest}>
      {children}
    </StyledButton>
  );
};

export default CustomButton;