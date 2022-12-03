import React from 'react';
import ReactDOM from 'react-dom/client';
import './main.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

document.title = 'Node-Temp'

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

