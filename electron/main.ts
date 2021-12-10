import { app, BrowserWindow, MessageChannelMain } from 'electron';
import * as path from 'path';
import { closeServer } from './scripts/start_server';
import * as signale from 'signale';
import { winstonLog } from './scripts/log';
import { startServer } from './server/start';

let mainWindow: BrowserWindow | null;

const isDev = process.env.NODE_ENV === 'development';
const gotTheLock = app.requestSingleInstanceLock();
winstonLog.log({ level: 'info', message: process.env.NODE_ENV ?? '' });
signale.note('process.cwd()=>' + process.cwd());

const { port1, port2 } = new MessageChannelMain();

const preloadPath = isDev
  ? path.resolve(process.cwd(), './electron/scripts/preload.js')
  : `${path.resolve(__dirname, './preload.js')}`;

async function createWindow() {
  mainWindow = new BrowserWindow({
    width: 400,
    height: 400,
    center: true,
    frame: false,
    transparent: true,
    resizable: true,
    titleBarStyle: 'customButtonsOnHover',
    webPreferences: {
      preload: preloadPath,
      nodeIntegration: true,
      contextIsolation: false
    }
  });
  mainWindow.setWindowButtonVisibility(false);

  const url = isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '..')}/render/index.html`;
  await mainWindow.loadURL(url);

  mainWindow.webContents.postMessage('port', null, [port2]);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
  setTimeout(() => {
    port1.postMessage({ loading: false });
    mainWindow?.hide();
    mainWindow?.setSize(1200, 700, true);
    mainWindow?.center();
    mainWindow?.setWindowButtonVisibility(true);
    setTimeout(() => {
      mainWindow?.show();
    }, 1000);
  }, 3000);
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
    startIpc(port1);
    await startServer();
  } catch (e) {
    winstonLog.error('发生错误' + e);
  }
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

app.on('before-quit', async (e: Electron.Event) => {
  try {
    await closeServer();
    app.quit();
    if (isDev) {
      signale.info('退出时间: ' + e.timeStamp);
    }
    winstonLog.log({ level: 'info', message: '退出时间: ' + e.timeStamp });
  } catch (e) {
    app.exit();
    if (isDev) {
      signale.error(e);
    }
    winstonLog.error('发生错误' + e);
  }
});
