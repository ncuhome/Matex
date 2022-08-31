import { IpcRenderer } from 'electron';
import { Headers,Response,Request } from 'got';
import { BodyRawType, BodyType, ReqType } from '../renderer/src/Model/ApiTest.model';

export interface NodeApiProps {
  NODE_ENV: 'development' | 'production' | string | undefined;
  ipc: IpcRenderer | null;
  OS: 'mac' | 'win';
  Clipboard: Electron.Clipboard;
}

export interface ApiTestReq {
  url: string;
  method: ReqType;
  headers: {
    [key: string]: string;
  };
  params?: {
    [key: string]: string;
  };
  bodyType?: BodyType;
  rawType: BodyRawType;
  body?: {
    formData?: { isFile: boolean; key: string; value: string };
    rawValue?: string;
    binary?: string;
    urlencoded?: {
      [key: string]: string;
    };
  };
}

export interface ApiTestRes extends Response{
  desc: string;
  size:{
    bodySize: string;
    headerSize:string
  }
  timer: { key: string; time: string | number }[];
}

export interface CommonReqParams {
  url: string;
  headers?: {
    [key: string]: string;
  };
}

export interface GetReqParams extends CommonReqParams {
  params?: ApiTestReq['params'];
}

export interface PostReqParams extends CommonReqParams {
  bodyType: ApiTestReq['bodyType'];
  rawType?: ApiTestReq['rawType'];
  body?: ApiTestReq['body'];
}
