import { EventData } from "@/types/calendar";
import { useAppDispatch } from "@/hooks/redux/useAppDispatch";
import { moveEvent } from "@/redux/slices/calendarSlice";
import { MonthGridCell } from "../calendarBody/styles";
import DraggableEventWrapper from "../draggableEventWrapper";
import { EventWrapper } from "../draggableEventWrapper/styles";
import { useAppSelector } from "@/hooks/redux/useAppSelector";
import { findHolidayByDate } from "@/utils/calendar";
import { HolidayEventWrapper } from "./styles";

interface EventCellProps {
    variant: "thisMonthCell" | "otherMonthCell" | "todayCell",
    label: string,
    rownum: 4 | 5 | 6,
    handleCellClick: (e: React.MouseEvent) => void,
    events: Record<string, EventData[]>,
    setEditingEvent: (event: EventData) => void,
    setListPopupOpenMode: (listPopupOpenMode: boolean) => void,
    setEditorPopupOpenMode: (editorPopupOpenMode: boolean) => void,
    handleListClick: (e: React.MouseEvent) => void,
    dateString: string,
    cardNum: string,
    listCloseMode: boolean,
    editorCloseMode: boolean
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
                                                cardNum,
                                                listCloseMode,
                                                editorCloseMode
                                            }) => {
    const dateEvents = events[dateString] || [];
    const dispatch = useAppDispatch();
    const holidays = useAppSelector((state) => state.holiday.allHolidays);

    const maxEventsToShow = findHolidayByDate(holidays, dateString) ? 1 : 2;

    return (
      <MonthGridCell
        key={dateString}
        variant={variant}
        rownum={rownum}
        onClick={(e) => {if(editorCloseMode || listCloseMode) return; handleCellClick(e); setEditorPopupOpenMode(true);} }
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          const data = JSON.parse(e.dataTransfer.getData("text/plain"));
          const { event, fromDate } = data;
          if (fromDate === dateString) return;
          dispatch(moveEvent({ event, fromDate, toDate: dateString }));
        }}
      >
        {label} <span style={{fontWeight:'5', fontSize:'12px'}}>{cardNum}</span>
        {findHolidayByDate(holidays, dateString)?<HolidayEventWrapper>{`Holiday: ${findHolidayByDate(holidays, dateString)?.localName}`}</HolidayEventWrapper> : null}
       
        {dateEvents.slice(0, maxEventsToShow).map((event, index) => (
            <DraggableEventWrapper
              key={index}
              event={event}
              index={index}
              dateString={dateString}
              onClick={(event, e) => {
                if(editorCloseMode || listCloseMode) return;
                e.stopPropagation();
                handleCellClick(e);
                setEditingEvent(event);
                setEditorPopupOpenMode(true);
              }}
            />
        ))}
        {dateEvents.length > maxEventsToShow && (
          <EventWrapper onClick={(e) => {if(editorCloseMode || listCloseMode) return; handleListClick(e); setListPopupOpenMode(true); e.stopPropagation();}}>
             +{dateEvents.length - maxEventsToShow} more
          </EventWrapper>
        )}
      </MonthGridCell>
    );
  };

  export default EventCell;