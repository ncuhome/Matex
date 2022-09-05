import { ipcMain } from 'electron';
import { IpcKey } from '/@common/globalKey';
import { IpcListener } from '../index';
import type { ApiTestReq } from '/@common/apiTest';
import { RequestServers } from './servers';

export const handleRequest = () => {
  ipcMain.removeHandler(IpcKey.ApiTestReq);
  ipcMain.handle(IpcKey.ApiTestReq, async (e, args) => {
    const { method, url, params, headers } = args as ApiTestReq;
    let res;
    switch (method) {
      case 'get':
        res = await RequestServers.Get({ url, params, headers });
    }
    IpcListener.sendResponse(res);
  });
};
