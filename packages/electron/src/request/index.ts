import { handleRequest } from './ApiTest';
import { BrowserWindow } from 'electron';
import { IpcKey } from '/@common/globalKey';

export class IpcListener {
  static mainWin: BrowserWindow;

  static start(mainWin: BrowserWindow) {
    IpcListener.mainWin = mainWin;
    handleRequest();
  }

  static sendResponse(args: any) {
    IpcListener.mainWin.webContents.send(IpcKey.ApiTestRes, args);
  }
}
