import React from 'react';
import ReactDOM from 'react-dom';
import { OverlayProvider } from '@react-aria/overlays';
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <OverlayProvider>
      <App />
    </OverlayProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
