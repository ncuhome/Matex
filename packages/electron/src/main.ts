import { app, BrowserWindow } from 'electron';
import { isDev, loadingPath, mainPath } from './utils/path';
import { MatexLog } from './utils/log';
import { getOsType } from './utils/system';
import { createLoadWin, createMainWin } from './core/createWindows';
import { emitter } from './utils/Instance';
import { getGotModule } from './request/utils';
import {listenRequest} from "./request";

const os = getOsType();
const isReload = isDev && process.env.RELOAD_MAIN === 'true';
MatexLog.debug(`当前系统为:${os}`);
MatexLog.debug(process.env.NODE_ENV ?? '环境未注入');

let mainWindow: BrowserWindow | undefined;
let loadWindow: undefined | BrowserWindow;

const gotTheLock = app.requestSingleInstanceLock();

//创建窗口
async function init() {
  try {
    if (!isReload) {
      loadWindow = await createLoadWin();
      os === 'mac' && loadWindow?.setWindowButtonVisibility(false);
      await loadWindow?.loadURL(loadingPath);
      loadWindow?.once('ready-to-show', () => {
        loadWindow?.show();
      });
      loadWindow?.on('closed', () => {
        loadWindow = undefined;
      });
    }
    mainWindow = await createMainWin();

    mainWindow?.on('ready-to-show', async () => {
      if (!isReload) {
        loadWindow?.close();
        loadWindow?.destroy();
      }
      mainWindow?.show();
      await emitter.emit('main-page-showed');
    });

    await mainWindow?.loadURL(mainPath);

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
  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });
}

app.on('ready', async () => {
  emitter.on('main-page-showed', async () => {
    await getGotModule();
    listenRequest()
  });

  await init();
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
