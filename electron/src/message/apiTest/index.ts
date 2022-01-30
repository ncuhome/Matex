import { ipcMain } from 'electron';
import { MatexLog } from '../../scripts/log';
import { ApiTest_Channel } from '../../../../common/ipc/channel';
import entities from 'entities';
import { RequestAction } from './service';
import { ApiTestReqProps } from '../../../../common';

export class ApiTestIpc {
  static init() {
    ApiTestIpc.listen();
  }

  static listen() {
    ipcMain.on(ApiTest_Channel.Request, async (e, args) => {
      const { url, method, headers, params } = args as ApiTestReqProps;

      let res: string;
      switch (method) {
        case 'Get':
          res = await RequestAction.doGet({ url, headers, params });
          break;
        case 'Post':
          res = await RequestAction.doGet({ url, headers, params });
          break;
        default:
          res = await RequestAction.doGet({ url, headers, params });
          break;
      }
      e.reply(ApiTest_Channel.Response, res);
    });
  }
}
