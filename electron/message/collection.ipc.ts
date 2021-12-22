import { ipcMain } from 'electron';
import got from 'got';

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
    ipcMain.on('collection_fetch', async (e, args) => {
      const { url, method } = args;
      const regexp = /<[a-z][\s\S]*>/i;
      if (method === 'Get') {
        const res = await got.get(url);
        const val = regexp.test(res.body);
        if (val) {
          e.reply('collection_res', res.body.toString());
        } else {
          e.reply('collection_res', JSON.parse(res.body));
        }
      }
    });
  }
}
