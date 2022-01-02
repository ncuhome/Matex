import { app, BrowserWindow, MessageChannelMain, screen } from 'electron';
import { startServer } from './server/start';
import { PortChannel } from './message';
import { loadingPath, mainPath, preloadPath } from './utils/path';
import { MatexLog } from './scripts/log';
import * as Sentry from '@sentry/electron';
import isLeapYear from 'dayjs/plugin/isLeapYear'; // 导入插件
import 'dayjs/locale/zh-cn'; // 导入本地化语言
import dayjs from 'dayjs';
import { getSystemOs } from './utils/system';

const OsType = getSystemOs();
MatexLog.debug(OsType);
dayjs.extend(isLeapYear); // 使用插件
dayjs.locale('zh-cn');
const isDev = process.env.NODE_ENV === 'development';
if (!isDev)
  Sentry.init({ dsn: 'https://a2beb50512ab48b180bf0c5a56d366a6@o1097702.ingest.sentry.io/6119380' });

let mainWindow: BrowserWindow | undefined;
let loadWindow: BrowserWindow | undefined;

const gotTheLock = app.requestSingleInstanceLock();

const { port1, port2 } = new MessageChannelMain();

const setMainWin = async () => {
  return new Promise((resolve, reject) => {
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
    if (mainWindow) {
      resolve(true);
    }
  });
};

const setLoadWin = async () => {
  return new Promise((resolve, reject) => {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;
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
      titleBarStyle: 'hidden',
      titleBarOverlay: false,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true
      }
    });
    if (loadWindow) {
      resolve(true);
    }
  });
};

//创建窗口
async function createWindow() {
  try {
    //加载页面
    MatexLog.success(dayjs().format('开始创建 YYYY年 MM月 DD号 HH:mm:ss:SSS'));
    await setLoadWin();
    await setMainWin();
    MatexLog.success(dayjs().format('创建完成 YYYY年 MM月 DD号 HH:mm:ss:SSS'));

    MatexLog.success('开始加载窗口:' + dayjs().format('YYYY年 MM月 DD号 HH:mm:ss:SSS'));

    if (OsType === 'mac') {
      loadWindow?.setWindowButtonVisibility(false);
    }
    await loadWindow?.loadURL(loadingPath);
    MatexLog.success('完成加载窗口:' + dayjs().format('YYYY年 MM月 DD号 HH:mm:ss:SSS'));

    loadWindow?.once('ready-to-show', () => {
      loadWindow?.show();
    });
    loadWindow?.on('closed', () => {
      MatexLog.success('loadWindow关闭');
      MatexLog.success(dayjs().format('YYYY年 MM月 DD号 HH:mm:ss:SSS'));
      loadWindow = undefined;
    });

    //等待主页面创建
    MatexLog.success('mainWindow开始' + dayjs().format('YYYY年 MM月 DD号 HH:mm:ss:SSS'));
    await mainWindow?.loadURL(mainPath);
    MatexLog.success('mainWindow完成' + dayjs().format('YYYY年 MM月 DD号 HH:mm:ss:SSS'));

    //发送通信端口
    mainWindow?.webContents.postMessage('port', null, [port2]);
    mainWindow?.on('closed', () => {
      mainWindow = undefined;
    });
  } catch (e) {
    MatexLog.error(e);
  }
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
  await createWindow();
  setTimeout(() => {
    loadWindow?.close();
    loadWindow?.destroy();
    mainWindow?.show();
  }, 100);
});

//当窗口加载完成调用
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
