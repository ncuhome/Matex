import { app, BrowserWindow, MessageChannelMain, screen } from 'electron';
import { PortChannel } from './message';
import { isDev, loadingPath, mainPath, preloadPath } from './utils/path';
import { MatexLog } from './scripts/log';
import * as Sentry from '@sentry/electron';
import isLeapYear from 'dayjs/plugin/isLeapYear'; // 导入插件
import 'dayjs/locale/zh-cn'; // 导入本地化语言
import dayjs from 'dayjs';
import { getOsType } from './utils/system';
import { createLoadWin, createMainWin } from './scripts/createWindows';

dayjs.extend(isLeapYear); // 使用插件
dayjs.locale('zh-cn');

const os = getOsType();
MatexLog.debug('ooo1');
if (!isDev)
  Sentry.init({ dsn: 'https://a2beb50512ab48b180bf0c5a56d366a6@o1097702.ingest.sentry.io/6119380' });

let mainWindow: BrowserWindow | undefined;
let loadWindow: BrowserWindow | undefined;

const gotTheLock = app.requestSingleInstanceLock();
const { port1, port2 } = new MessageChannelMain();

//创建窗口
async function createWindow() {
  try {
    loadWindow = await createLoadWin();
    mainWindow = await createMainWin();

    os === 'mac' && loadWindow?.setWindowButtonVisibility(false);
    await loadWindow?.loadURL(loadingPath);

    loadWindow?.once('ready-to-show', () => {
      loadWindow?.show();
    });
    loadWindow?.on('closed', () => {
      loadWindow = undefined;
    });

    await mainWindow?.loadURL(mainPath);

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
  if (mainWindow) {
    loadWindow?.close();
    loadWindow?.destroy();
    mainWindow.show();
  }
});

//当窗口加载完成调用
app.whenReady().then(async () => {
  try {
    MatexLog.debug(process.env.NODE_ENV ?? '');
    MatexLog.debug(process.env.LOADING_PATH ?? '');
  } catch (e) {
    MatexLog.error('发生错误1' + e);
  }
});

app.on('window-all-closed', function () {
  app.quit();
});

app.on('before-quit', async (e: Electron.Event) => {
  try {
    app.quit();
  } catch (e: any) {
    app.exit();
    MatexLog.error('发生错误' + e);
  }
});
