import { app, BrowserWindow, Notification, ipcMain } from 'electron';
import * as path from 'path';
import { myEmitter } from './utils/EventEmiter';
import { MockData } from '../src/pages/Mock';

let mainWindow: BrowserWindow | null;

const isDev = process.env.NODE_ENV === 'development';

console.log('是否是生产版本', !isDev);
console.log('运行平台', process.platform);
console.log('根路径', __dirname);

async function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    // frame: false,
    transparent: true,
    titleBarStyle: 'hidden',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      scrollBounce: true,
      nodeIntegrationInWorker: true
    }
  });
  new Notification({
    body: isDev ? '调试' : '生产',
    title: '运行模式1'
  }).show();
  const url = isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '..')}/render/index.html`;

  await mainWindow.loadURL(url);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}
app.on('ready', createWindow);

app.whenReady().then(async () => {
  process.env.AB = '9999';
  mainWindow?.webContents.openDevTools();
  const startFastify = (await import('./fastify/index')).default;
  startFastify();
  console.log(',111111111111');
  const startIpc = (await import('./scripts/ipc')).default;
  startIpc();
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
