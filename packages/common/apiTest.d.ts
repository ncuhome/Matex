import {
  AuthType,
  AuthValueType,
  BodyRawType,
  BodyType,
  KVConfig,
  ReqType
} from '../renderer/src/Model/ApiTest.model';
import { IncomingHttpHeaders } from 'http';

export type KVList = Omit<KVConfig, 'selected' | 'opt'>[];

export interface ApiTestReq {
  url: string;
  method: ReqType;
  headers: KVList;
  auth?: {
    type: AuthType;
    value: AuthValueType;
  };
  params?: KVList;
  bodyType?: BodyType;
  rawType?: BodyRawType;
  body?: KVList | File | string | string[];
}

export interface ApiTestRes {
  isError: boolean;
  error?: ReqError;
  result?: ExactRes;
}

export interface HttpError {
  url:string;
  headers: IncomingHttpHeaders;
  size: {
    resBodySize: string;
    resHeaderSize: string;
  };
}

export interface ReqError {
  type: 'http' | 'fs' | 'other';
  errorCode: string;
  desc: string;
  httpErrorObj?:HttpError;
}


export interface ExactRes {
  type: string | 'text' | 'json' | 'html' | 'xml';
  mimeType: string;
  statusCode: number;
  statusMassage: string;
  cookie: Object[];
  body: any;
  headers: IncomingHttpHeaders;
  size: {
    resBodySize: string;
    resHeaderSize: string;
  };
  timer: { key: string; time: string | number }[];
}

export interface CommonReqParams {
  url: string;
  headers?: ApiTestReq['headers'];
  auth: ApiTestReq['auth'];
}

export interface GetReqParams extends CommonReqParams {
  params: ApiTestReq['params'];
}

export interface PostReqParams extends CommonReqParams {
  bodyType: ApiTestReq['bodyType'];
  rawType?: ApiTestReq['rawType'];
  body?: ApiTestReq['body'];
}

export interface FileKVData extends Omit<KVConfig, 'selected' | 'opt'> {
  isFile?: boolean;
}
