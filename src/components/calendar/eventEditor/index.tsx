import React, { useState } from 'react';
import {
  EditorContainer,
  EditorTitle,
  Input,
  Textarea,
  ButtonGroup,
  Button
} from './styles';

type Props = {
  selectedDate: Date;
  onClose: () => void;
  onSave: (data: { title: string; desc: string; event_style: string }) => void;
};

const EventEditor: React.FC<Props> = ({ selectedDate, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [eventStyle, setEventStyle] = useState('meeting');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ title, desc, event_style: eventStyle });
    onClose();
  };

  return (
    <EditorContainer>
      <EditorTitle>New Event on {selectedDate.toDateString()}</EditorTitle>
      <form onSubmit={handleSubmit}>
        <Input
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <Input
          placeholder="Style (e.g. party, meeting)"
          value={eventStyle}
          onChange={(e) => setEventStyle(e.target.value)}
          required
        />
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
    </EditorContainer>
  );
};

export default EventEditor;