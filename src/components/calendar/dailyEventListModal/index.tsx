import { EditorPopup } from "../eventEditor/styles";
import { EventData, PopupPosition } from "@/types/calendar";
import { DailyEventListWrapper } from "./styles";
import { Button, EditorTitle } from "../eventEditor/styles";
import { useAppDispatch } from "@/hooks/redux/useAppDispatch";
import { moveEvent } from "@/redux/slices/calendarSlice";
import DraggableEventWrapper from "../draggableEventWrapper";

interface DailyEventListModalProps {
    handleCellClick: (e: React.MouseEvent) => void;
    onClose: () => void;
    events: Record<string, EventData[]>;
    setEditingEvent: (event: EventData) => void;
    date: string;
    listPosition: PopupPosition;
    setEditorPopupOpenMode: (editorPopupOpenMode: boolean) => void,
}

const DailyEventListModal: React.FC<DailyEventListModalProps> = ({handleCellClick, date, events, onClose, listPosition, setEditingEvent, setEditorPopupOpenMode }) => {
        const dateEvents = events[date] || [];
        const dispatch = useAppDispatch();
    return (
        <EditorPopup $top={listPosition.y}
                     $left={listPosition.x}
                     $transformOrigin={listPosition.transformOrigin}
                     $varient="list"
        >
          <EditorTitle>Events on {date}</EditorTitle>
          <DailyEventListWrapper
            onClick={(e) => {handleCellClick(e)}}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              const data = JSON.parse(e.dataTransfer.getData("text/plain"));
              const { event, fromDate } = data;
              if (fromDate === date) return;
              dispatch(moveEvent({ event, fromDate, toDate: date }));
            }}
          >
            {dateEvents.map((event, index) => (
                <DraggableEventWrapper
                    key={index}
                    event={event}
                    index={index}
                    dateString={date}
                    onClick={(event, e) => {
                    e.stopPropagation();
                      handleCellClick(e);
                      setEditingEvent(event);
                      setEditorPopupOpenMode(true);
                    }}
                />
            ))}
          </DailyEventListWrapper>
          <Button onClick={onClose}>
            Close
          </Button>
        </EditorPopup>
    );
};

export default DailyEventListModal;