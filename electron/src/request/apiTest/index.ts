import { ipcMain } from 'electron';
import { ApiTest_Channel } from '../../../../common/ipc/channel';
import { RequestAction } from './service';
import { ApiTestReqProps, ApiTestResProps, ReqError } from '../../../../common';

export class ApiTestIpc {
  static init() {
    ApiTestIpc.listen();
  }

  static listen() {
    ipcMain.on(ApiTest_Channel.Request, async (e, args) => {
      const { url, method, headers, type, params, body, rawType } = args as ApiTestReqProps;

      let res: ApiTestResProps | ReqError;
      switch (method) {
        case 'Get':
          res = await RequestAction.doGet({ url, headers, params });
          break;
        case 'Post':
          res = await RequestAction.doPost({ url, headers, body, type, rawType });
          break;
        case 'Put':
          res = await RequestAction.doPut({ url, headers, body, type, rawType });
          break;
        default:
          res = await RequestAction.doGet({ url, headers, params });
          break;
      }
      if (res.type === 'error') {
        e.reply(ApiTest_Channel.ReqError, res);
      } else {
        e.reply(ApiTest_Channel.Response, res);
      }
    });
  }
}
