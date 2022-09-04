import { BrowserWindow, screen } from 'electron';
import { isDev, preloadPath } from '../utils/path';
import { getOsType } from '../utils/system';
import { MatexLog } from '../utils/log';

const os = getOsType();
export const createMainWin = async (): Promise<BrowserWindow> => {
  return new Promise((resolve) => {
    try {
      const { width, height } = screen.getPrimaryDisplay().workAreaSize;
      const mainWindow = new BrowserWindow({
        width: width - 30,
        height: height,
        center: true,
        frame: os === 'win',
        show: false,
        transparent: true,
        resizable: false,
        titleBarStyle: os === 'win' ? (isDev ? 'default' : 'hidden') : 'hidden',
        trafficLightPosition: {
          x: 16,
          y: 20
        },
        webPreferences: {
          preload: preloadPath,
          nodeIntegration: false,
          contextIsolation: true,
          devTools: true,
          plugins: true
        }
      });
      if (mainWindow) {
        resolve(mainWindow);
      }
    } catch (e) {
      MatexLog.error(e);
      process.exit(1);
    }
  });
};

export const createLoadWin = async (): Promise<BrowserWindow> => {
  return new Promise((resolve) => {
    try {
      const { width, height } = screen.getPrimaryDisplay().workAreaSize;
      const loadWindow = new BrowserWindow({
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
        resolve(loadWindow);
      }
    } catch (e) {
      MatexLog.error(e);
      process.exit(1);
    }
  });
};
