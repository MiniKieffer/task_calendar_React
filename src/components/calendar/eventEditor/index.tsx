import React, { useState, useEffect } from 'react';
import {
  EditorPopup,
  EditorTitle,
  Input,
  Textarea,
  ButtonGroup,
  Button, 
  OptionContainer,
  Dropdown,
  OptionsList,
  OptionLabel
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

const options = [
  { value: 'meeting', label: 'Meeting' },
  { value: 'party', label: 'Party' },
  { value: 'traveling', label: 'Traveling' },
  { value: 'dating', label: 'Dating' },
  { value: 'hiking', label: 'Hiking' },
  { value: 'task', label: 'Task' },
];

const EventEditor: React.FC<EventEditorProps> = ({ date, initialData, onClose, editorPosition }) => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState(initialData?.title || "");
  const [desc, setDesc] = useState(initialData?.desc || "");
  const [style, setStyle] = useState(initialData?.event_style || []);
  const [open, setOpen] = useState(false);

  const toggleValue = (value: string) => {
    setStyle(prev =>
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    );
  };

  useEffect(() => {
      console.log(date);
    },[date])

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
      dispatch(updateEvent(eventData));
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
      <EditorTitle>{initialData ? "Edit Event" : `New Event on ${date}`}</EditorTitle>
      <div>
        
      </div>
      <form onSubmit={handleSave}>
        <Input
          placeholder="Event Title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <OptionContainer>
          <Dropdown onClick={() => setOpen(!open)}>
            {style.length > 0 ? style.join(', ') : 'Select options'}
          </Dropdown>
          {open && (
            <OptionsList>
              {options.map((opt, id) => (
                <OptionLabel key={id}>
                  <input
                    type="checkbox"
                    name="style"
                    checked={style.includes(opt.value)}
                    onChange={() => toggleValue(opt.value)}
                  />
                  {opt.label}
                </OptionLabel>
              ))}
            </OptionsList>
          )}
        </OptionContainer>
        <Textarea
          placeholder="Description"
          name="description"
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