import { app, BrowserWindow, MessageChannelMain, screen } from 'electron';
import * as path from 'path';
import * as signale from 'signale';
import { startServer } from './server/start';
import { PortChannel } from './communication';
import { myEmitter } from './utils/EventEmiter';

let mainWindow: BrowserWindow | null;

const isDev = process.env.NODE_ENV === 'development';
const gotTheLock = app.requestSingleInstanceLock();
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
    center: false,
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
  //假设的加载过程
  setTimeout(() => {
    PortChannel.postMessage<null>('loading', null);
    mainWindow?.hide();
    mainWindow?.setSize(width - 100, height, false);
    mainWindow?.center();
    mainWindow?.setWindowButtonVisibility(true);
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

  myEmitter.on('loading', (data) => {
    if (data) {
      console.log(mainWindow?.getSize());
      setTimeout(() => {
        mainWindow?.show();
        console.log(mainWindow?.getSize());
      }, 50);
    }
  });
});

app.whenReady().then(async () => {
  try {
    await startServer();
  } catch (e) {
    signale.error('发生错误' + e);
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
    signale.log({ level: 'info', message: '退出时间: ' + e.timeStamp });
  } catch (e) {
    app.exit();
    if (isDev) {
      signale.error(e);
    }
    signale.error('发生错误' + e);
  }
});
