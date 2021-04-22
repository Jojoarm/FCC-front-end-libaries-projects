import './App.css';
import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Projects from './components/Projects';
import RandomQuotes from './components/RandomQuotes';
import Calculator from './components/Calculator';
import Calc from './components/calculator/Calc'
import MarkdownPreviewer from './components/markdown/MarkdownPreviewer';

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
          <Route path="/calculator">
            <Calculator />
          </Route>
          <Route path="/markdown-previewer">
            <MarkdownPreviewer />
          </Route>

        </Switch>
      </div>
    </Router>
    
  );
}

export default App;
