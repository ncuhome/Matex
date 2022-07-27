import { BrowserWindow, app, dialog, ipcMain } from 'electron';
import { isDev } from '../utils/path';
import HotUpdateInstance from './autoUpdate';
import { AfterCheckRes } from '../type/update';
import { Progress } from 'got';
import { DownloadProgress } from '../../../common';
import fileSize from 'filesize';
import { Update_Channel } from '../../../common/ipc/channel';

export const handleUpdate = async (mainWindow: BrowserWindow) => {
  if (isDev) {
    return;
  } else {
    HotUpdateInstance.on(Update_Channel.AfterCheck, async (res: AfterCheckRes) => {
      if (res.isUpdate) {
        const result = await dialog.showMessageBox({
          type: 'info',
          title: '更新提示',
          message: `有新的更新啦,版本${res.version},需要下载${res.size}的更新包,是否立即更新`,
          buttons: ['立即更新', '下次再说']
        });
        if (result.response === 0) {
          mainWindow.webContents.send(Update_Channel.StartDownload);

          ipcMain.on(Update_Channel.CancelUpdate, () => {
            HotUpdateInstance.emit(Update_Channel.CancelUpdate);
          });

          HotUpdateInstance.on(Update_Channel.UpdateCanceled, () => {
            mainWindow.webContents.send(Update_Channel.UpdateCanceled);
          });

          HotUpdateInstance.on(Update_Channel.DownloadProgress, (pro: Progress) => {
            const progress = {
              percent: Math.floor(pro.percent * 100),
              transferred: fileSize(pro.transferred),
              total: fileSize(pro.total ?? 1024)
            } as DownloadProgress;
            mainWindow.webContents.postMessage(Update_Channel.DownloadProgress, progress);
          });

          HotUpdateInstance.on(Update_Channel.UpdateDownloaded, async () => {
            mainWindow.webContents.postMessage(Update_Channel.UpdateDownloaded, null);
            await finishedUpdate(mainWindow);
          });
          await HotUpdateInstance.downFile();
        }
      }
    });
    await HotUpdateInstance.checkUpdate();
  }
};

const finishedUpdate = async (mainWindow: BrowserWindow) => {
  const res = await HotUpdateInstance.extractZip();
  const result = await dialog.showMessageBox({
    type: 'info',
    title: '更新提示',
    message: '下载更新完成,是否立即安装并重启?',
    buttons: ['确定', '取消']
  });
  if (result.response === 0) {
    if (res) {
      app.relaunch();
      app.exit(0);
    } else {
      await dialog.showErrorBox('更新失败', '解压更新包失败,请重试');
    }
  } else {
    mainWindow.webContents.send(Update_Channel.RelaunchDelay, null);
  }
};
