import { app, BrowserWindow, MessageChannelMain, screen } from 'electron';
import { startServer } from './server/start';
import { PortChannel } from './message';
import { loadingPath, loadUrl, preloadPath } from './utils/path';
import { MatexLog } from './scripts/log';

let mainWindow: BrowserWindow | undefined;
let loadWindow: BrowserWindow | undefined;

const gotTheLock = app.requestSingleInstanceLock();

const { port1, port2 } = new MessageChannelMain();

async function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  mainWindow = new BrowserWindow({
    width: width - 100,
    height: height - 20,
    center: true,
    frame: false,
    show: false,
    transparent: true,
    resizable: true,
    titleBarStyle: 'customButtonsOnHover',
    webPreferences: {
      preload: preloadPath,
      nodeIntegration: true,
      contextIsolation: false
    }
  });
  loadWindow = new BrowserWindow({
    width: 400,
    height: 400,
    center: false,
    x: (width - 400) / 2,
    y: (height - 400) / 2,
    frame: false,
    transparent: true,
    resizable: false,
    show: true,
    titleBarStyle: 'customButtonsOnHover',
    webPreferences: {
      preload: preloadPath,
      nodeIntegration: true,
      contextIsolation: false
    }
  });
  loadWindow.setWindowButtonVisibility(false);
  await loadWindow?.loadURL(loadingPath);
  loadWindow.once('ready-to-show', () => {
    loadWindow?.show();
  });

  await mainWindow.loadURL(loadUrl);

  //发送通信端口
  mainWindow.webContents.postMessage('port', null, [port2]);

  mainWindow.on('closed', () => {
    mainWindow = undefined;
  });

  loadWindow.on('closed', () => {
    MatexLog.success('loadWindow 关闭');
    loadWindow = undefined;
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

app.on('ready', async () => {
  PortChannel.setPort(port1);
  PortChannel.startListening();
  createWindow();
  setTimeout(() => {
    loadWindow?.close();
    loadWindow?.destroy();
    mainWindow?.show();
  }, 7000);
});

app.whenReady().then(async () => {
  try {
    await startServer();
  } catch (e) {
    MatexLog.error('发生错误' + e);
  }
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

app.on('before-quit', async (e: Electron.Event) => {
  try {
    app.quit();
    MatexLog.log('退出时间: ' + Date.now().toLocaleString());
  } catch (e: any) {
    app.exit();
    MatexLog.error('发生错误' + e);
  }
});
