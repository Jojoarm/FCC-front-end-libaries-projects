import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reducer, { initialState } from './reducer';
import { StateProvider } from './StateContext';

ReactDOM.render(
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>,
  document.getElementById('root')
);

