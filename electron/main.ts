import { app, BrowserWindow } from 'electron';
import * as path from 'path';
let mainWindow: BrowserWindow | null;
require('electron-reload');

const isDev = process.env.NODE_ENV === 'development';

console.log('运行平台', process.cwd());
console.log('根路径', __dirname);

if (isDev) {
  require('electron-debug')();
}
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 688,
    frame: true,
    icon: path.resolve(__dirname, 'assets/icon/icon.png'),
    backgroundColor: 'red',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'scripts/preload.js')
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
