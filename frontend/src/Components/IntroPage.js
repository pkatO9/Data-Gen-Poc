import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useHistory } from 'react-router-dom';

const IntroPage = () => {
  const history = useHistory();

  const navigateToGeneration = () => {
    history.push('/generate');
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Welcome to the Question Generator
      </Typography>
      <Typography variant="body1" gutterBottom>
        This application helps you generate questions based on various subjects, chapters, and topics.
      </Typography>
      <Button variant="contained" color="primary" onClick={navigateToGeneration}>
        Get Started
      </Button>
    </Container>
  );
};

export default IntroPage;