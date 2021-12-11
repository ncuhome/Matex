import { app, BrowserWindow, MessageChannelMain, screen } from 'electron';
import * as path from 'path';
import * as signale from 'signale';
import { winstonLog } from './scripts/log';
import { startServer } from './server/start';
import { PortChannel } from './communication';

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
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  mainWindow = new BrowserWindow({
    width: 400,
    height: 400,
    x: (width - 400) / 2,
    y: (height - 400) / 2,
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
  console.log();
  const url = isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '..')}/render/index.html`;
  await mainWindow.loadURL(url);

  mainWindow.webContents.postMessage('port', null, [port2]);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
  setTimeout(() => {
    PortChannel.postMessage<null>('loading', null);
    mainWindow?.hide();
    mainWindow?.setSize(width - 100, height, true);
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

app.on('ready', () => {
  PortChannel.setPort(port1);
  PortChannel.startListening();
  createWindow();
});

app.whenReady().then(async () => {
  try {
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
