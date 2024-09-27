import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';  // Import Provider
import { store } from './store';         // Import store

ReactDOM.render(
  <Provider store={store}>              {/* Wrap the app in Provider */}
    <App />
  </Provider>,
  document.getElementById('root')
);
