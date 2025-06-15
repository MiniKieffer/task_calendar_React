import { EventData } from "@/types/calendar";
import { useAppDispatch } from "@/hooks/redux/useAppDispatch";
import { moveEvent } from "@/redux/slices/calendarSlice";
import { MonthGridCell } from "../calendarBody/styles";
import DraggableEventWrapper from "../draggableEventWrapper";
import { EventWrapper } from "../draggableEventWrapper/styles";
import { useAppSelector } from "@/hooks/redux/useAppSelector";

interface EventCellProps {
    variant: "thisMonthCell" | "otherMonthCell" | "todayCell",
    label: string,
    rownum: 5 | 6,
    handleCellClick: (e: React.MouseEvent) => void,
    events: Record<string, EventData[]>,
    setEditingEvent: (event: EventData) => void,
    setListPopupOpenMode: (listPopupOpenMode: boolean) => void,
    setEditorPopupOpenMode: (editorPopupOpenMode: boolean) => void,
    handleListClick: (e: React.MouseEvent) => void,
    dateString: string,
    cardNum: string
}

const EventCell: React.FC<EventCellProps> = ({
                                                variant, 
                                                label, 
                                                rownum, 
                                                handleCellClick, 
                                                events, 
                                                setEditingEvent, 
                                                setListPopupOpenMode, 
                                                setEditorPopupOpenMode, 
                                                handleListClick, 
                                                dateString,
                                                cardNum
                                            }) => {
    const dateEvents = events[dateString] || [];
    const dispatch = useAppDispatch();
    const holidays = useAppSelector((state) => state.holiday.allHolidays);

    return (
      <MonthGridCell
        key={dateString}
        variant={variant}
        rownum={rownum}
        onClick={(e) => {handleCellClick(e); setEditorPopupOpenMode(true);} }
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          const data = JSON.parse(e.dataTransfer.getData("text/plain"));
          const { event, fromDate } = data;
          if (fromDate === dateString) return;
          dispatch(moveEvent({ event, fromDate, toDate: dateString }));
        }}
      >
        {label} <span style={{fontWeight:'5', fontSize:'12px'}}>{cardNum}</span>
        {dateEvents.slice(0, 2).map((event, index) => (
            <DraggableEventWrapper
              key={index}
              event={event}
              index={index}
              dateString={dateString}
              onClick={(event, e) => {
                e.stopPropagation();
                handleCellClick(e);
                setEditingEvent(event);
                setEditorPopupOpenMode(true);
              }}
            />
        ))}
        {dateEvents.length > 2 && (
          <EventWrapper onClick={(e) => {handleListClick(e); setListPopupOpenMode(true); e.stopPropagation();}}>
             +{dateEvents.length - 2} more
          </EventWrapper>
        )}
      </MonthGridCell>
    );
  };

  export default EventCell;