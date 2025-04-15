import AppLayout from './views/AppLayout.jsx';
import ReactDOM from 'react-dom/client';
import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './style/index.css';

ReactDOM.hydrateRoot(
  document.getElementById('root'),
  <React.StrictMode>
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  </React.StrictMode>,
);
