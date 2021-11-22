import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { HashRouter, BrowserRouter } from 'react-router-dom';
import './globle.scss';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import './useWorker';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1E9CFC'
    },
    secondary: {
      main: '#6365F1'
    },
    error: {
      main: '#F73C3C'
    },
    info: {
      main: '#BFC3C4'
    },
    success: {
      main: '#3CDB6B'
    },
    warning: {
      main: '#F5D21E'
    }
  }
});
const isDev = process.env.NODE_ENV === 'development';

ReactDOM.render(
  renderRoot(
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
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
