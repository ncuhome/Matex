import React from 'react';
import App from './App';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { MatexWin } from '/@/global';
import { createRoot } from 'react-dom/client';
import { NextUIProvider } from '@nextui-org/react';
import {theme} from "./theme";
import './global.css';

const isDev = MatexWin.NODE_ENV === 'development';
console.log('isDev',isDev)
//防止打包后导航失效
function renderRoot(child: React.ReactNode) {
  if (isDev) {
    return <BrowserRouter>{child}</BrowserRouter>;
  } else {
    return <HashRouter>{child}</HashRouter>;
  }
}

// render
const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(
  renderRoot(
    <NextUIProvider theme={theme}>
      <App />
    </NextUIProvider>
  )
);
