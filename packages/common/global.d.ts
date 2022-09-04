import { IpcRenderer } from 'electron';
import { Headers,Response,Request } from 'got';
import {BodyRawType, BodyType, KVConfig, ReqType} from '../renderer/src/Model/ApiTest.model';

export interface NodeApiProps {
  nodeV:string;
  chromeV:string;
  electronV:string;
  NODE_ENV: 'development' | 'production' | string | undefined;
  ipc: {
    sendReq:(args: ApiTestReq)=>void
    on:(args: any)=>void
  };
  OS: 'mac' | 'win';
  Clipboard: Electron.Clipboard;
}

type KVList = Omit<KVConfig, 'selected'|'opt'>;

export interface ApiTestReq {
  url: string;
  method: ReqType;
  headers: KVList[];
  params?: KVList[];
  bodyType?: BodyType;
  rawType?: BodyRawType;
  body?: KVList[]|File|string;
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
