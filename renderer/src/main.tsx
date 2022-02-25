import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import './globle.css';
import './custom.css';
import 'semantic-ui-css/semantic.min.css';
import 'react-toastify/dist/ReactToastify.min.css';
import './useWorker';
import { MatexWin } from './global';
import 'sweetalert2/src/sweetalert2.scss';

const isDev = MatexWin.NODE_ENV === 'development';

ReactDOM.render(renderRoot(<App />), document.getElementById('root'));
function renderRoot(child: React.ReactNode) {
  if (isDev) {
    return <BrowserRouter>{child}</BrowserRouter>;
  } else {
    return <HashRouter>{child}</HashRouter>;
  }
}
