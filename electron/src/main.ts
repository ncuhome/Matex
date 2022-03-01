import { app, BrowserWindow, MessageChannelMain, Notification } from 'electron';
import { PortChannel } from './request';
import { documentsPath, isDev, loadingPath, mainPath } from './utils/path';
import { MatexLog } from './scripts/log';
import * as Sentry from '@sentry/electron';
import isLeapYear from 'dayjs/plugin/isLeapYear'; // 导入插件
import 'dayjs/locale/zh-cn'; // 导入本地化语言
import dayjs from 'dayjs';
import { getOsType } from './utils/system';
import { createLoadWin, createMainWin } from './scripts/createWindows';
import { writeFileSync } from 'fs';

dayjs.extend(isLeapYear); // 使用插件
dayjs.locale('zh-cn');

const os = getOsType();
MatexLog.debug(`当前系统为:${os}`);
MatexLog.debug(process.env.NODE_ENV ?? '环境未注入');
if (!isDev)
  Sentry.init({ dsn: 'https://a2beb50512ab48b180bf0c5a56d366a6@o1097702.ingest.sentry.io/6119380' });

let mainWindow: BrowserWindow | undefined;
let loadWindow: BrowserWindow | undefined;

const gotTheLock = app.requestSingleInstanceLock();
const { port1, port2 } = new MessageChannelMain();

//创建窗口
async function init() {
  try {
    loadWindow = await createLoadWin();

    os === 'mac' && loadWindow?.setWindowButtonVisibility(false);
    await loadWindow?.loadURL(loadingPath);

    loadWindow?.once('ready-to-show', () => {
      loadWindow?.show();
    });
    loadWindow?.on('closed', () => {
      loadWindow = undefined;
    });
    mainWindow = await createMainWin();
    mainWindow?.on('ready-to-show', () => {
      loadWindow?.close();
      loadWindow?.destroy();
      mainWindow?.show();
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
  await init();
  // if (mainWindow) {
  //   loadWindow?.close();
  //   loadWindow?.destroy();
  //   mainWindow.show();
  // }
});

//当窗口加载完成调用
app.whenReady().then(async () => {
  try {
    writeFileSync(documentsPath, '999');
    MatexLog.debug(process.env.NODE_ENV ?? '');
    MatexLog.debug(process.env.LOADING_PATH ?? '');
  } catch (e) {
    new Notification({
      title: '错误',
      body: '' + e
    }).show();
    MatexLog.error('发生错误' + e);
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
