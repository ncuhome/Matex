import { app, BrowserWindow, Notification, ipcMain } from 'electron';
import * as path from 'path';

let mainWindow: BrowserWindow | null;

const isDev = process.env.NODE_ENV === 'development';
const gotTheLock = app.requestSingleInstanceLock();

console.log('根路径=>', __dirname);

async function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    // frame: false,
    transparent: true,
    titleBarStyle: 'hidden',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });
  if (!gotTheLock) {
    app.quit();
  } else {
    app.on('second-instance', (event, commandLine, workingDirectory) => {
      // Someone tried to run a second instance, we should focus our window.
      if (mainWindow) {
        if (mainWindow.isMinimized()) mainWindow.restore();
        mainWindow.focus();
      }
    });
  }
  const url = isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '..')}/render/index.html`;

  await mainWindow.loadURL(url);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}
app.on('ready', createWindow);

app.whenReady().then(async () => {
  mainWindow?.webContents.openDevTools();
  const startFastify = (await import('./fastify/index')).default;
  startFastify();
  require('./scripts/redis');
  const startIpc = (await import('./scripts/ipc')).default;
  startIpc();
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
