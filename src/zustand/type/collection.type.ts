import { ReqMethod } from '../../type/collection';

export interface ParamType {
  index: number;
  key: string;
  value: string | number;
}

export interface ParamList {
  paramList: ParamType[];
  addParam: (param: ParamType) => void;
  updateParam: (index: number, field: 'key' | 'value', val: string) => void;
  deleteParam: (index: number) => void;
}

export interface HeaderType {
  index: number;
  key: 'Authorization' | 'Content-Type' | string;
  value: string;
}

export interface HeaderList {
  headerList: HeaderType[];
  addHeader: (header: HeaderType) => void;
  updateHeader: (index: number, field: 'key' | 'value', val: string) => void;
  deleteHeader: (index: number) => void;
}

export interface BodyType {
  index: number;
  key: string;
  value: string;
  file?: any;
}

export interface UrlConfig {
  method: ReqMethod;
  url: string;
  setMethod: (method: ReqMethod) => void;
  setUrl: (url: string) => void;
}
