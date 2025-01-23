import AppLayout from '../views/public-blog/AppLayout.jsx';
import ReactDOM from 'react-dom/client';
import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import '../style/input.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  </React.StrictMode>,
);
