import Home from './components/Home.jsx';
import ReactDOM from 'react-dom/client';
import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.hydrateRoot(
  document.getElementById('root'),
  <React.StrictMode>
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  </React.StrictMode>,
);
