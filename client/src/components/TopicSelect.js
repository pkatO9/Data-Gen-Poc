// src/components/TopicSelect.js
import React, { useState } from 'react';
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const TopicSelect = ({ onTopicSelect, chapter }) => {
  const [topic, setTopic] = useState('');

  const handleChange = (event) => {
    setTopic(event.target.value);
  };

  const handleSubmit = () => {
    if (topic) {
      onTopicSelect(topic);  // Pass the selected topic to the parent
    }
  };

  const topics = {
    'Laws of Motion': ['Newton\'s First Law', 'Newton\'s Second Law'],
    Thermodynamics: ['Heat Transfer', 'Laws of Thermodynamics'],
    Algebra: ['Quadratic Equations', 'Polynomials'],
  };

  return (
    <FormControl fullWidth>
      <InputLabel>Topic</InputLabel>
      <Select value={topic} onChange={handleChange}>
        {topics[chapter]?.map((topic) => (
          <MenuItem key={topic} value={topic}>{topic}</MenuItem>
        ))}
      </Select>
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Fetch Questions
      </Button>
    </FormControl>
  );
};

export default TopicSelect;
