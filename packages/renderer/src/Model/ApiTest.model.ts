import type { Menus } from '/@/Hooks/useContextMenu';
import { nanoid } from 'nanoid';

// reqConfig
export type ReqType = 'post' | 'get' | 'put' | 'delete' | 'header';
export const ReqMethods: ReqType[] = ['post', 'get', 'put'];

export type ConfigType = 'params' | 'header' | 'body';
export const SelConfigs: ConfigType[] = ['params', 'header', 'body'];

export type BodyType = 'form-data' | 'raw' | 'binary' | 'urlencoded';
export const BodyTypes: BodyType[] = ['urlencoded', 'form-data', 'raw', 'binary'];

export type BodyRawType = 'json' | 'text' | 'html' | 'javascript';
export const BodyRawTypes = ['json', 'text', 'html', 'javascript'];

export const ConfigTableTitleMap = new Map<string, string>([
  ['get-params', 'Get查询参数'],
  ['get-header', 'Get请求头'],
  ['get-body', ''],
  ['post-params', ''],
  ['post-header', 'Post请求头'],
  ['post-body-urlencoded', 'application/x-www-form-urlencoded'],
  ['post-body-form-data', 'multipart/form-data'],
  ['post-body-raw', '任意格式文本'],
  ['post-body-binary', '二进制文件数据']
]);

export interface KVConfig {
  selected: boolean;
  key: string;
  value: string | File;
  opt: any;
}
export const DefaultHerderConfig: KVConfig[] = [
  { selected: true, key: 'Accept', value: '*/*', opt: '' },
  { selected: true, key: 'Connection', value: 'keep-alive', opt: '' }
];
export const InputContextMenus: Menus = [{ key: '复制' }, { key: '粘贴' }, { key: '清除' }];

// result
export type ResDataType = '响应数据' | '响应头';
export const ResDataTypeList = ['响应数据', '响应头'];

export type ResDisplayType = 'Pretty' | 'Preview';
export const ResDisplayTypeList = ['Pretty', 'Preview', 'Visual'];

export type ResFormatType = 'json' | 'text' | 'html' | 'xml';
export const ResFormatTypeList = ['json', 'html', 'xml', 'text'];

// sidebar
export type SidebarMenuType = '项目接口' | '网络测速';
export const SidebarMenus: SidebarMenuType[] = ['项目接口', '网络测速'];
