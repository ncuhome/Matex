import type { ApiTestReq } from './apiTest';

export interface NodeApiProps {
  nodeV: string;
  chromeV: string;
  electronV: string;
  NODE_ENV: 'development' | 'production' | string | undefined;
  ipc: {
    sendApiTestReq: (args: ApiTestReq) => void;
    onApiTestRes: (callback: (e: Electron.IpcRendererEvent, args: any) => void) => void;
  };
  OS: 'mac' | 'win';
  Clipboard: Electron.Clipboard;
}
