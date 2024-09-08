import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import IntroPage from './Components/IntroPage';
import GenerationPage from './Components/GenerationPage';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={IntroPage} />
        <Route path="/generate" component={GenerationPage} />
      </Switch>
    </Router>
  );
};

export default App;