import type { IpcRenderer } from 'electron';

export interface NodeApiProps {
  NODE_ENV: 'development' | 'production' | string;
  ipc: IpcRenderer | null;
  MessagePort: MessagePort | null;
  decodeHTML5: (str: string | any[]) => string;
}

export interface ApiTestReqProps {
  url: string;
  method: 'Get' | 'Post' | 'Put' | 'Delete';
  headers: {
    [key: string]: string;
  };
}
