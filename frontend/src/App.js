import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import IntroPage from './Components/IntroPage';
import GenerationPage from './Components/GenerationPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/generate" element={<GenerationPage />} />
      </Routes>
    </Router>
  );
};

export default App;