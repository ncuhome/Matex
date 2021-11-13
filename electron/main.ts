import { app, BrowserWindow } from 'electron';
import * as path from 'path';
let mainWindow: BrowserWindow | null;

const isDev = process.env.NODE_ENV === 'development';

if (isDev) {
  require('electron-debug')();
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  if (isDev) {
    mainWindow.loadURL('http://localhost:4000');
  } else {
    mainWindow.loadURL(`file://${path.join(__dirname, '..')}/render/index.html`);
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);
