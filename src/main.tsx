import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import './globle.css';
import './useWorker';
import { GeistProvider } from '@geist-ui/react';

const isDev = process.env.NODE_ENV === 'development';

ReactDOM.render(
  renderRoot(
    <GeistProvider>
      <App />
    </GeistProvider>
  ),
  document.getElementById('root')
);

function renderRoot(child: React.ReactNode) {
  if (isDev) {
    return <BrowserRouter>{child}</BrowserRouter>;
  } else {
    return <HashRouter>{child}</HashRouter>;
  }
}
