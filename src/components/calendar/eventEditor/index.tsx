import React, { useState } from 'react';
import {
  EditorPopup,
  EditorTitle,
  Input,
  Textarea,
  ButtonGroup,
  Button, 
  Select
} from './styles';
import { useAppDispatch } from '@/hooks/redux/useAppDispatch';
import { EventData, EditorPosition } from '@/types/calendar';
import { updateEvent, addEvent } from '@/redux/slices/calendarSlice';
import { nanoid } from '@reduxjs/toolkit';

type EventEditorProps = {
  date: string;
  initialData?: EventData | null;
  onClose: () => void;
  editorPosition: EditorPosition;
};

const EventEditor: React.FC<EventEditorProps> = ({ date, initialData, onClose, editorPosition }) => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState(initialData?.title || "");
  const [desc, setDesc] = useState(initialData?.desc || "");
  const [style, setStyle] = useState(initialData?.event_style || "meeting");

  const handleSave = () => {
    let eventData: EventData;
    if(initialData) {
        eventData = {
            ...initialData,
            title,
            desc,
            event_style: style,
            date,
        }
    } else {
        eventData = {
            id: nanoid(),
            title,
            desc,
            event_style: style,
            date,
        }
    }

    if (initialData) {
      dispatch(updateEvent({ original: initialData, updated: eventData }));
    } else {
      dispatch(addEvent(eventData));
    }

    onClose();
  };

  return (
    <EditorPopup 
        $top={editorPosition.y}
        $left={editorPosition.x}
        $transformOrigin={editorPosition.transformOrigin}
    >
      <EditorTitle>{initialData ? "Edit Event" : `New Event on ${new Date(date).toDateString()}`}</EditorTitle>
      <form onSubmit={handleSave}>
        <Input
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <Select value={style} onChange={(e) => setStyle(e.target.value)} required>
          <option value="meeting">Meeting</option>
          <option value="party">Party</option>
          <option value="task">Task</option>
        </Select>
        <Textarea
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <ButtonGroup>
          <Button type="submit">Save</Button>
          <Button type="button" variant="cancel" onClick={onClose}>Cancel</Button>
        </ButtonGroup>
      </form>
    </EditorPopup>
  );
};

export default EventEditor;