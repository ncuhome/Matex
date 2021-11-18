import { app, BrowserWindow, Notification, ipcMain } from 'electron';
import * as path from 'path';
import { startServer, closeServer } from './server';
let mainWindow: BrowserWindow | null;

const isDev = process.env.NODE_ENV === 'development';
const gotTheLock = app.requestSingleInstanceLock();
const scriptPath = path.resolve(process.cwd(), './electron/shell/index.js');
console.log('根路径=>', __dirname);

async function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    transparent: true,
    titleBarStyle: 'hidden',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });
  const url = isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '..')}/render/index.html`;

  await mainWindow.loadURL(url);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}
//避免多实例
if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });
}

app.on('ready', createWindow);

app.whenReady().then(async () => {
  try {
    const startIpc = (await import('./scripts/ipc')).default;
    startIpc();
    mainWindow?.webContents.openDevTools();
    startServer(scriptPath);
  } catch (e) {
    console.log('发生错误:', e);
  }
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

app.on('will-quit', async (e: Electron.Event) => {
  await closeServer();
  console.log('退出时间', e.timeStamp);
});
