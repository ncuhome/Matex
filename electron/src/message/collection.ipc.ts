import { ipcMain } from 'electron';
import got from 'got';
import { MatexLog } from '../scripts/log';

const entities = require('entities');

interface CollectionChannel_ {
  collection_fetch: any;
  collection_save: any;
}

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

export type CollectionChannels = keyof CollectionChannel_;

export class CollectionIpc {
  static init() {
    CollectionIpc.listen();
  }

  static listen() {
    ipcMain.on('collection_req', async (e, args) => {
      const { url, method, headers } = args;
      MatexLog.success(args);
      const regexp = /<[a-z][\s\S]*>/i;
      if (method === 'Get') {
        const res = await got.get(url, {
          headers
        });
        const val = regexp.test(res.body);
        if (val) {
          e.reply('collection_res', entities.encodeHTML5(res.body));
        } else {
          e.reply('collection_res', JSON.parse(res.body));
        }
      }
    });
  }
}
