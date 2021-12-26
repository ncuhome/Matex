import { ReqMethod, TabItems } from '../../type/collection';

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
  value: any;
}

export interface BodyList {
  bodyList: BodyType[];
  addBody: (header: BodyType) => void;
  updateBody: (index: number, field: 'key' | 'value', val: any) => void;
  deleteBody: (index: number) => void;
}

export interface UrlConfig {
  method: ReqMethod;
  url: string;
  activeTab: TabItems;
  setActiveTab: (tab: TabItems) => void;
  setMethod: (method: ReqMethod) => void;
  setUrl: (url: string) => void;
}
