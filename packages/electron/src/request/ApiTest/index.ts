import { ipcMain } from 'electron';
import { IpcKey } from '/@common/globalKey';
import { IpcListener } from '../index';
import type { ApiTestReq } from '/@common/apiTest';
import { RequestServers } from './servers';
import { Response } from 'matexhttp';
import { ApiTestRes, ReqError } from '/@common/apiTest';

export const handleRequest = () => {
  ipcMain.removeHandler(IpcKey.ApiTestReq);
  ipcMain.handle(IpcKey.ApiTestReq, async (e, args) => {
    const { method, url, params, headers, auth, body, bodyType } = args as ApiTestReq;
    let res;
    switch (method) {
      case 'get':
        res = await RequestServers.Get({ url, params, headers, auth });
        break;
      case 'post':
        res = await RequestServers.Post({ url, body, headers, bodyType, auth });
        break;
    }
    IpcListener.sendResponse(res);
  });
};
