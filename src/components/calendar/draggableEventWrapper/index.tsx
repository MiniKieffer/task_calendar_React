import React from "react";
import { EventWrapper, EventItem, EventBoxes, EventBox } from "./styles";
import { EventData } from "@/types/calendar";
import { useAppDispatch } from "@/hooks/redux/useAppDispatch";
import { reorderEventWithinDay } from "@/redux/slices/calendarSlice";

interface DraggableEventWrapperProps {
  event: EventData;
  dateString: string;
  index: number;
  onClick: (event: EventData, e: React.MouseEvent) => void;
}

const DraggableEventWrapper: React.FC<DraggableEventWrapperProps> = ({
  event,
  dateString,
  index,
  onClick,
}) => {
  const dispatch = useAppDispatch();

  return (
    <EventWrapper
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        const data = JSON.parse(e.dataTransfer.getData("text/plain"));
        const { fromDate, fromIndex } = data;
        if (fromDate === dateString && fromIndex !== index) {
          dispatch(
            reorderEventWithinDay({
              date: dateString,
              fromIndex,
              toIndex: index,
            })
          );
        }
      }}
    >
      <EventItem
        variant={event.event_style}
        draggable
        onDragStart={(e) => {
          e.dataTransfer.setData(
            "text/plain",
            JSON.stringify({ event, fromDate: dateString, fromIndex: index })
          );
        }}
        onClick={(e) => onClick(event, e)}
      >
        <EventBoxes>
          {event.event_style.map((style, id) => (
            <EventBox key={id} variant={style} />
          ))}
        </EventBoxes>
        {event.title}
      </EventItem>
    </EventWrapper>
  );
};

export default DraggableEventWrapper;