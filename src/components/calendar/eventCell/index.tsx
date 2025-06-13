import { EventData } from "@/types/calendar";
import { useAppDispatch } from "@/hooks/redux/useAppDispatch";
import { moveEvent } from "@/redux/slices/calendarSlice";
import { MonthGridCell } from "../calendarBody/styles";
import DraggableEventWrapper from "../draggableEventWrapper";
import { EventWrapper } from "../draggableEventWrapper/styles";

interface EventCellProps {
    variant: "thisMonthCell" | "otherMonthCell" | "todayCell",
    label: string,
    rownum: 5 | 6,
    handleCellClick: (e: React.MouseEvent, date: string) => void;
    events: Record<string, EventData[]>,
    setEditingEvent: (event: EventData) => void,
    dateString: string
}

const EventCell: React.FC<EventCellProps> = ({variant, label, rownum, handleCellClick, events, setEditingEvent, dateString}) => {
    const dateEvents = events[dateString] || [];
    const dispatch = useAppDispatch();

    return (
      <MonthGridCell
        key={dateString}
        onClick={(e) => handleCellClick(e, dateString)}
        variant={variant}
        rownum={rownum}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          const data = JSON.parse(e.dataTransfer.getData("text/plain"));
          const { event, fromDate } = data;
          if (fromDate === dateString) return;
          dispatch(moveEvent({ event, fromDate, toDate: dateString }));
        }}
      >
        {label}
        {dateEvents.slice(0, 2).map((event, i) => (
            <DraggableEventWrapper
              key={i}
              event={event}
              index={i}
              dateString={dateString}
              onClick={(event, e) => {
                handleCellClick(e, dateString);
                setEditingEvent(event);
              }}
            />
        ))}
        {dateEvents.length > 2 && (
          <EventWrapper>
             +{dateEvents.length - 2} more
          </EventWrapper>
        )}
      </MonthGridCell>
    );
  };

  export default EventCell;