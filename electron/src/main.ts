import { app, BrowserWindow, MessageChannelMain, Notification, ipcMain, dialog } from 'electron';
import { PortChannel } from './request';
import { isDev, loadingPath, mainPath } from './utils/path';
import { MatexLog } from './core/log';
import * as Sentry from '@sentry/electron';
import { getOsType } from './utils/system';
import { createLoadWin, createMainWin } from './core/createWindows';
import { Global_Channel } from '../../common/ipc/channel';
import { listenPip } from './utils/dev';
import { handleUpdate } from './core/handleUpdate';

const os = getOsType();
const isReload = isDev && process.env.RELOAD_MAIN === 'true';
MatexLog.debug(`当前系统为:${os}`);
MatexLog.debug(process.env.NODE_ENV ?? '环境未注入1');
if (!isDev)
  Sentry.init({ dsn: 'https://a2beb50512ab48b180bf0c5a56d366a6@o1097702.ingest.sentry.io/6119380' });

let mainWindow: BrowserWindow | undefined;
let loadWindow: BrowserWindow | undefined;
let isFullscreen = false;

const gotTheLock = app.requestSingleInstanceLock();
const { port1, port2 } = new MessageChannelMain();

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
      mainWindow && handleUpdate(mainWindow);
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
  app.on('second-instance', () => {
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
});

//当窗口加载完成调用
app.whenReady().then(async () => {
  isDev && listenPip();
  try {
    if (os === 'win') {
      ipcMain.on(Global_Channel.TrafficLights, (e, type) => {
        const op = type as 'close' | 'minimize' | 'fullscreen';
        switch (op) {
          case 'close':
            {
              mainWindow?.close();
            }
            break;
          case 'minimize':
            {
              mainWindow?.minimize();
            }
            break;
          case 'fullscreen':
            {
              if (isFullscreen) {
                mainWindow?.setFullScreen(false);
                isFullscreen = false;
              } else {
                mainWindow?.setFullScreen(true);
                isFullscreen = true;
              }
            }
            break;
        }
      });
    }
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
