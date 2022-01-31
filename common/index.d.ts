import type { IpcRenderer } from 'electron';
import type { IncomingHttpHeaders } from 'http';

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
  params: {
    [key: string]: string;
  };
}

export interface ApiTestResProps<T = any> {
  type: 'html' | 'text' | 'xml' | 'image' | 'audio' | 'video' | 'json' | 'pdf' | 'word' | 'bytes' | 'other';
  statusCode: number;
  desc: string;
  body: T;
  headers: IncomingHttpHeaders;
  timer: {
    wait?: number | undefined;
    dns?: number | undefined;
    tcp?: number | undefined;
    tls?: number | undefined;
    request?: number | undefined;
    firstByte?: number | undefined;
    download?: number | undefined;
    total?: number | undefined;
  };
}
