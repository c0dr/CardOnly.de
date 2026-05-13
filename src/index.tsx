import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import 'font-awesome/css/font-awesome.min.css'
import App from './App';
import { unregister } from './registerServiceWorker';

const container = document.getElementById('root');
if (!container) {
  throw new Error('Root element not found');
}
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

unregister();