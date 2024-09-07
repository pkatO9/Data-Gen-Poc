import React, { useState } from 'react';
import { Button, FormControl, InputLabel, MenuItem, Select, Container, Typography, List, ListItem, ListItemText, TextField } from '@mui/material';
import axios from 'axios';

const App = () => {
  const [subject, setSubject] = useState('');
  const [chapter, setChapter] = useState('');
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [questions, setQuestions] = useState([]);
  const [customSubject, setCustomSubject] = useState('');
  const [customChapter, setCustomChapter] = useState('');
  const [customTopic, setCustomTopic] = useState('');
  const [customDifficulty, setCustomDifficulty] = useState('');

  const handleGenerateQuestions = async () => {
    try {
      const response = await axios.post('/api/questions/generate/prompt', {
        subject: subject || customSubject,
        chapter: chapter || customChapter,
        topic: topic || customTopic,
        difficulty: difficulty || customDifficulty,
      });

      setQuestions(response.data.savedQuestions);
    } catch (error) {
      console.error('Error generating questions:', error);
    }
  };

  const handleRegenerateQuestions = async () => {
    // Clear previous questions and generate new ones
    setQuestions([]);
    handleGenerateQuestions();
  };

  const subjects = ['Physics', 'Chemistry', 'Mathematics'];
  const chapters = {
    Physics: ['Simple Harmonic Motion', 'Laws of Motion'],
    Chemistry: ['Organic Chemistry', 'Physical Chemistry'],
    Mathematics: ['Algebra', 'Calculus'],
  };
  const topics = {
    'Simple Harmonic Motion': ['Velocity of Simple Harmonic Motion', 'Amplitude'],
    'Laws of Motion': ['Newton\'s Laws', 'Inertia'],
    Algebra: ['Quadratic Equations', 'Polynomials'],
  };
  const difficulties = ['easy', 'medium', 'hard'];

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Question Generator
      </Typography>

      {/* Subject Dropdown */}
      <FormControl fullWidth margin="normal">
        <InputLabel>Subject</InputLabel>
        <Select value={subject} onChange={(e) => setSubject(e.target.value)}>
          {subjects.map((subject) => (
            <MenuItem key={subject} value={subject}>
              {subject}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Custom Subject Input */}
      <TextField
        fullWidth
        margin="normal"
        label="Or Add Custom Subject"
        value={customSubject}
        onChange={(e) => setCustomSubject(e.target.value)}
      />

      {/* Chapter Dropdown */}
      {subject && (
        <FormControl fullWidth margin="normal">
          <InputLabel>Chapter</InputLabel>
          <Select value={chapter} onChange={(e) => setChapter(e.target.value)}>
            {chapters[subject]?.map((chapter) => (
              <MenuItem key={chapter} value={chapter}>
                {chapter}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {/* Custom Chapter Input */}
      <TextField
        fullWidth
        margin="normal"
        label="Or Add Custom Chapter"
        value={customChapter}
        onChange={(e) => setCustomChapter(e.target.value)}
      />

      {/* Topic Dropdown */}
      {chapter && (
        <FormControl fullWidth margin="normal">
          <InputLabel>Topic</InputLabel>
          <Select value={topic} onChange={(e) => setTopic(e.target.value)}>
            {topics[chapter]?.map((topic) => (
              <MenuItem key={topic} value={topic}>
                {topic}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {/* Custom Topic Input */}
      <TextField
        fullWidth
        margin="normal"
        label="Or Add Custom Topic"
        value={customTopic}
        onChange={(e) => setCustomTopic(e.target.value)}
      />

      {/* Difficulty Dropdown */}
      <FormControl fullWidth margin="normal">
        <InputLabel>Difficulty</InputLabel>
        <Select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
          {difficulties.map((level) => (
            <MenuItem key={level} value={level}>
              {level}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Custom Difficulty Input */}
      <TextField
        fullWidth
        margin="normal"
        label="Or Add Custom Difficulty"
        value={customDifficulty}
        onChange={(e) => setCustomDifficulty(e.target.value)}
      />

      {/* Generate Questions Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleGenerateQuestions}
        disabled={!subject && !customSubject || !chapter && !customChapter || !topic && !customTopic || !difficulty && !customDifficulty}
      >
        Generate Questions
      </Button>

      {/* Regenerate Questions Button */}
      {questions.length > 0 && (
        <Button
          variant="contained"
          color="secondary"
          onClick={handleRegenerateQuestions}
          style={{ marginTop: '10px' }}
        >
          Regenerate Questions
        </Button>
      )}

      {/* Display Generated Questions */}
      {questions.length > 0 && (
        <div>
          <Typography variant="h5" gutterBottom>
            Generated Questions:
          </Typography>
          <List>
            {questions.map((q, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={<Typography variant="h6">{q.question}</Typography>}
                  secondary={
                    <>
                      <Typography variant="subtitle1">Options:</Typography>
                      <ul>
                        {q.options.map((option, i) => (
                          <li key={i}>
                            <Typography>{option}</Typography>
                          </li>
                        ))}
                      </ul>
                      <Typography variant="body1" color="textSecondary">
                        Correct Answer: {q.correctAnswer}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        </div>
      )}
    </Container>
  );
};

export default App;