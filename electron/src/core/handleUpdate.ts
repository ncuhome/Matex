import { BrowserWindow, app, dialog, ipcMain } from 'electron';
import { isDev } from '../utils/path';
import HotUpdateInstance from './autoUpdate';
import { AfterCheckRes } from '../type/update';
import { Progress } from 'got';

export const handleUpdate = async (mainWindow: BrowserWindow) => {
  if (isDev) {
    return;
  } else {
    HotUpdateInstance.on('after-check-update', async (res: AfterCheckRes) => {
      if (res.isUpdate) {
        const result = await dialog.showMessageBox({
          type: 'info',
          title: '更新提示',
          message: `有新的更新啦,版本${res.version},需要下载${res.size}的更新包,是否立即更新`,
          buttons: ['立即更新', '下次再说']
        });
        if (result.response === 0) {
          ipcMain.on('cancel-update', () => {
            HotUpdateInstance.emit('cancel-update');
          });
          HotUpdateInstance.on('download-progress', (pro: Progress) => {
            mainWindow.webContents.postMessage('download-progress', pro);
          });
          HotUpdateInstance.on('update-downloaded', () => {
            finishedUpdate();
            mainWindow.webContents.postMessage('update-downloaded', null);
          });
          await HotUpdateInstance.downFile();
        }
      }
    });
    await HotUpdateInstance.checkUpdate();
  }
};

const finishedUpdate = async () => {
  const result = await dialog.showMessageBox({
    type: 'success',
    title: '更新提示',
    message: '下载更新完成,是否立即解压安装并重启?',
    buttons: ['确定', '取消']
  });
  if (result.response === 0) {
    const res = await HotUpdateInstance.extractZip();
    if (res) {
      app.relaunch();
      app.exit(0);
    } else {
      await dialog.showErrorBox('更新失败', '解压更新包失败,请重试');
    }
  }
};
