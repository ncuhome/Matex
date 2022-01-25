import { ipcMain } from 'electron';
import got from 'got';
import { MatexLog } from '../scripts/log';
import { ApiTest_Channel } from '../../../common/ipc/channel';
import entities from 'entities';

interface CollectionFetchProps {
  type: 'Get' | 'Post' | 'Put' | 'Delete';
  url: string;
  body: any;
  params: {
    [key: string]: any;
  };
  headers?: {
    'Content-Type': string;
    Authorization: string;
    [key: string]: string;
  };
}

export class ApiTestIpc {
  static init() {
    ApiTestIpc.listen();
  }

  static listen() {
    ipcMain.on(ApiTest_Channel.Request, async (e, args) => {
      const { url, method, headers } = args;
      MatexLog.success(args);
      const regexp = /<[a-z][\s\S]*>/i;
      if (method === 'Get') {
        const res = await got.get(url, {
          headers
        });
        const val = regexp.test(res.body);
        if (val) {
          e.reply(ApiTest_Channel.Response, entities.encodeHTML5(res.body));
        } else {
          e.reply(ApiTest_Channel.Response, JSON.parse(res.body));
        }
      }
    });
  }
}
