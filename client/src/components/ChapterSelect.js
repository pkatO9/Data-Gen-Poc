// src/components/ChapterSelect.js
import React, { useState } from 'react';
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const ChapterSelect = ({ onChapterSelect, subject }) => {
  const [chapter, setChapter] = useState('');

  const handleChange = (event) => {
    setChapter(event.target.value);
  };

  const handleSubmit = () => {
    if (chapter) {
      onChapterSelect(chapter);  // Pass the selected chapter to the parent
    }
  };

  const chapters = {
    Physics: ['Laws of Motion', 'Thermodynamics'],
    Chemistry: ['Organic Chemistry', 'Inorganic Chemistry'],
    Mathematics: ['Algebra', 'Calculus'],
  };

  return (
    <FormControl fullWidth>
      <InputLabel>Chapter</InputLabel>
      <Select value={chapter} onChange={handleChange}>
        {chapters[subject]?.map((chapter) => (
          <MenuItem key={chapter} value={chapter}>{chapter}</MenuItem>
        ))}
      </Select>
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Select Topic
      </Button>
    </FormControl>
  );
};

export default ChapterSelect;
