import React from "react";
import App from './App';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { MatexWin } from '/@/Global/global';
import { createRoot } from 'react-dom/client';
import './Global/global.css';
import './Global/custom.scss';
import 'react-toastify/dist/ReactToastify.min.css'
import './useWorker'

const isDev = MatexWin.NodeApi.NODE_ENV === 'development';
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
root.render(renderRoot(<App />));
