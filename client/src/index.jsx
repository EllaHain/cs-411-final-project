import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App'; // Import your App component


// Render your app
const root = document.getElementById('root');
if (root) {
  createRoot(root).render(<App />);
} else {
  console.error('Root element not found');
}
