import { app, BrowserWindow, Notification } from 'electron';
import * as path from 'path';
let mainWindow: BrowserWindow | null;

const isDev = process.env.NODE_ENV === 'development';

console.log('是否是生产版本', !isDev);
console.log('运行平台', process.platform);
console.log('根路径', __dirname);

async function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    frame: true,
    icon: `${__dirname}/assets/icon/general@2x.png`,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      scrollBounce: true
      // preload: path.join(__dirname, 'scripts/preload.js')
    }
  });
  new Notification({
    body: isDev ? '调试' : '生产',
    title: '运行模式1'
  }).show();

  if (isDev) {
    await mainWindow.loadURL('http://localhost:3000');
  } else {
    await mainWindow.loadURL(`file://${path.join(__dirname, '..')}/render/index.html`);
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}
app.on('ready', createWindow);
app.whenReady().then(() => {
  mainWindow?.webContents.openDevTools();
});
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
