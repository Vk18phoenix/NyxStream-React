// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // Imports App
import { BrowserRouter } from 'react-router-dom'; // Keep Router for later

// Import CSS (keep these so basic styles apply if rendering works)
import './index.css';
import './index1.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> {/* Keep Router */}
      <App />       {/* Renders App */}
    </BrowserRouter>
  </React.StrictMode>
);
// NO EXPORT HERE