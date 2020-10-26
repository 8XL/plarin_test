import React from 'react';
import ReactDOM from 'react-dom';
import '../src/scss/index.scss';
import { App } from './App';
import reportWebVitals from './reportWebVitals';

import { store } from './store';

export const rootStore = React.createContext(store)

ReactDOM.render(
  <React.StrictMode>
    <rootStore.Provider value={ store }>
    <App />
    </rootStore.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
