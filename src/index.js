// Entry point: mounts React app and configures global styles
import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap for styling
import App from './App';

// Create a root for React and render the main App component
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
