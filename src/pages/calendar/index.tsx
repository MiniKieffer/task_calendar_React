import CalendarHeader from './calendarHeader';
import CalendarBody from './calendarBody';
import { CalendarContainer } from './styles';

const CalenderPage = () => {
  return (
    <>
      <CalendarContainer>
        <CalendarHeader />
        <CalendarBody />
      </CalendarContainer>
    </>
  );
}

export default CalenderPage;


