import { app, BrowserWindow } from 'electron';
import * as path from 'path';
let mainWindow: BrowserWindow | null;

const isDev = process.env.NODE_ENV === 'development';

if (isDev) {
  require('electron-debug')();
}
require('electron-reload');
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: true,
    backgroundColor: 'red',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  if (isDev) {
    mainWindow.loadURL('http://localhost:3000');
  } else {
    mainWindow.loadURL(`file://${path.join(__dirname, '..')}/render/index.html`);
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
