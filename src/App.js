import './App.css';
import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Projects from './components/Projects';
import RandomQuotes from './components/RandomQuotes';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Projects />
          </Route>
          <Route path="/random-quotes">
            <RandomQuotes />
          </Route>

        </Switch>
      </div>
    </Router>
    
  );
}

export default App;
