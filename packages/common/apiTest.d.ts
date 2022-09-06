import { BodyRawType, BodyType, KVConfig, ReqType } from '../renderer/src/Model/ApiTest.model';
import { Response } from 'got';
import { IncomingHttpHeaders } from 'http';

export type KVList = Omit<KVConfig, 'selected' | 'opt'>[];

export interface ApiTestReq {
  url: string;
  method: ReqType;
  headers: KVList;
  params?: KVList;
  bodyType?: BodyType;
  rawType?: BodyRawType;
  body?: KVList | File | string;
}

export interface ApiTestRes {
  type: string;
  statusCode: number;
  statusMassage: string;
  body: any;
  headers: IncomingHttpHeaders;
  size: {
    resBodySize: string;
    resHeaderSize: string;
  };
  timer: {
    [key: string]: string | number;
  }[];
}

export interface CommonReqParams {
  url: string;
  headers?: ApiTestReq['headers'];
}

export interface GetReqParams extends CommonReqParams {
  params: ApiTestReq['params'];
}

export interface PostReqParams extends CommonReqParams {
  bodyType: ApiTestReq['bodyType'];
  rawType?: ApiTestReq['rawType'];
  body?: ApiTestReq['body'];
}
