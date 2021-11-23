import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import { startServer, closeServer } from './server';
let mainWindow: BrowserWindow | null;
import * as signale from 'signale';
const isDev = process.env.NODE_ENV === 'development';
const gotTheLock = app.requestSingleInstanceLock();
const scriptPath = path.resolve(process.cwd(), './electron/shell/index.js');
signale.note('根路径=>' + __dirname);
signale.note('process.cwd()=>' + process.cwd());

async function createWindow() {
  mainWindow = new BrowserWindow({
    width: 400,
    height: 400,
    center: true,
    transparent: false,
    backgroundColor: '#FFF',
    titleBarStyle: 'hidden',
    webPreferences: {
      preload: path.resolve(process.cwd(), './electron/scripts/preload.js'),
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  const url = isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '..')}/render/index.html`;
  await mainWindow.loadURL(url);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
  setTimeout(() => {
    mainWindow?.hide();
    mainWindow?.setSize(1286, 700, false);
    mainWindow?.center();
    mainWindow?.show();
  }, 10000);
}

async function createLoading() {
  mainWindow = new BrowserWindow({
    width: 400,
    height: 400,
    transparent: false,
    frame: false,
    backgroundColor: '#FFF',
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });
  const url = isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '..')}/render/index.html`;
  await mainWindow.loadURL(url);
  try {
    mainWindow.on('closed', () => {
      mainWindow = null;
    });
  } catch (e) {
    signale.error(e);
  }
}
// mainWindow.set

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

app.on('ready', async () => {
  await createWindow();
  // setTimeout(async () => {
  //   mainWindow?.close();
  //   await createWindow();
  //   mainWindow?.webContents.openDevTools();
  // }, 20000);
});

app.whenReady().then(async () => {
  try {
    const startIpc = (await import('./scripts/ipc')).default;
    startIpc();
    startServer(scriptPath);
  } catch (e) {
    signale.error(e);
  }
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

app.on('before-quit', async (e: Electron.Event) => {
  await closeServer();
  app.quit();
  console.log('退出时间before-quit', e.timeStamp);
});
