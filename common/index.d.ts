import type { IpcRenderer } from 'electron';
import type { IncomingHttpHeaders } from 'http';
import { BodyItemType, BodyRawType } from '../renderer/src/type/apiTest';

export interface NodeApiProps {
  NODE_ENV: 'development' | 'production' | string|undefined;
  ipc: IpcRenderer | null;
  Clipboard: Electron.Clipboard;
  MessagePort: MessagePort | null;
  decodeHTML5: (str: string ) => string;
}

export interface FormDataReq {
  isFile: boolean;
  key: string;
  value: string;
}

export interface ApiTestReqProps {
  url: string;
  method: 'Get' | 'Post' | 'Put' | 'Delete';
  headers: {
    [key: string]: string;
  };
  params?: {
    [key: string]: string;
  };
  type: BodyItemType;
  rawType: BodyRawType;
  body?: {
    formData?: FormDataReq[];
    rawValue?: string;
    binary?: string;
    urlencoded?: {
      [key: string]: string;
    };
  };
}

export interface ApiTestResProps<T = any> {
  type:
  | 'text/html'
  | 'text/plain'
  | 'application/xml'
  | 'application/json'
  | 'application/pdf'
  | 'application/msword'
  | string;
  statusCode: number;
  desc: string;
  size: string;
  body: T;
  headers: IncomingHttpHeaders;
  timer: {
    [key: string]: number | undefined;
  };
}

export interface ReqError {
  type: 'error';
  stack: string;
  errno: number;
  code: string;
  syscall: string;
  address: string;
  port: number;
}
