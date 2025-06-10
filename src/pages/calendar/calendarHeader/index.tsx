import CustomButton from "@/components/customButton";
import { CalendarHeaderContainer } from "./styles";

const CalendarHeader = () => {
  return (
    <>
      <CalendarHeaderContainer>
          <div>
            <CustomButton>Hello World</CustomButton>
            <CustomButton>Hello World</CustomButton>
          </div>
          <div>
            <CustomButton>Hello World</CustomButton>
          </div>
          <div>
            <CustomButton>Hello World</CustomButton>
            <CustomButton>Hello World</CustomButton>
          </div>
      </CalendarHeaderContainer>
    </>
  );
}

export default CalendarHeader;