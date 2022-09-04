import { ipcMain } from 'electron';
import { IpcKey } from '../../../../common/globalKey';
import { ApiTestReq } from '../../../../common/global';

export const handleRequest = () => {
  ipcMain.removeHandler(IpcKey.ApiTestReq);
  ipcMain.handle(IpcKey.ApiTestReq, (e, args) => {
    const req = args as ApiTestReq;
    console.log(req)
  });
};
