import { ipcMain } from 'electron';
import { ApiTest_Channel } from '../../../../common/ipc/channel';
import { RequestAction } from './service';
import { ApiTestReqProps, ApiTestResProps } from '../../../../common';

export class ApiTestIpc {
  static init() {
    ApiTestIpc.listen();
  }

  static listen() {
    ipcMain.on(ApiTest_Channel.Request, async (e, args) => {
      const { url, method, headers, params, body } = args as ApiTestReqProps;

      let res: ApiTestResProps;
      switch (method) {
        case 'Get':
          res = await RequestAction.doGet({ url, headers, params });
          break;
        case 'Post':
          res = await RequestAction.doPost({ url, headers, body });
          break;
        default:
          res = await RequestAction.doGet({ url, headers, params });
          break;
      }
      e.reply(ApiTest_Channel.Response, res);
    });
  }
}
