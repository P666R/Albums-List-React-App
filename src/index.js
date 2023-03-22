import './index.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './store';

const el = document.getElementById('root');
const root = createRoot(el);

// connecting react to redux
// wrapping App component with Provider
// making Redux store available to all child components
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
