// src/components/SubjectSelect.js
import React, { useState } from 'react';
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const SubjectSelect = ({ onSubjectSelect }) => {
  const [subject, setSubject] = useState('');

  const handleChange = (event) => {
    setSubject(event.target.value);
  };

  const handleSubmit = () => {
    if (subject) {
      onSubjectSelect(subject);  // Pass the selected subject to the parent
    }
  };

  return (
    <FormControl fullWidth>
      <InputLabel>Subject</InputLabel>
      <Select value={subject} onChange={handleChange}>
        <MenuItem value="Physics">Physics</MenuItem>
        <MenuItem value="Chemistry">Chemistry</MenuItem>
        <MenuItem value="Mathematics">Mathematics</MenuItem>
      </Select>
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Select Chapter
      </Button>
    </FormControl>
  );
};

export default SubjectSelect;
