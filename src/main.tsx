import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { VechaiProvider } from '@vechaiui/react';
import { HashRouter } from 'react-router-dom';

ReactDOM.render(
  <HashRouter>
    <VechaiProvider>
      <App />
      111
    </VechaiProvider>
  </HashRouter>,
  document.getElementById('root')
);
