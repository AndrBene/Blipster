import AppLayout from '../../views/AppLayout.jsx';
import ReactDOM from 'react-dom/client';
import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  </React.StrictMode>,
);