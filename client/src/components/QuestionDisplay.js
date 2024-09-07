// src/components/QuestionDisplay.js
import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

const QuestionDisplay = ({ topic }) => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    // Call the backend to fetch questions for the topic
    fetch(`/fetch?topic=${topic}`)
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      .catch((err) => console.error('Error fetching questions:', err));
  }, [topic]);

  return (
    <List>
      {questions.map((question, index) => (
        <ListItem key={index}>
          <ListItemText
            primary={`Q: ${question.question}`}
            secondary={`Options: ${question.options.join(', ')}`}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default QuestionDisplay;
