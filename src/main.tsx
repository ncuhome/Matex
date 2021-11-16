import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import { HashRouter, BrowserRouter } from 'react-router-dom';
import './globle.scss';

const isDev = process.env.NODE_ENV === 'development';

ReactDOM.render(
  renderRoot(
    <ChakraProvider resetCSS={false}>
      <App />
    </ChakraProvider>
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
