import type { Menus } from '/@/Hooks/useContextMenu';

export type ReqType = 'post' | 'get' | 'put';
export const ReqMethods: ReqType[] = ['post', 'get', 'put'];

export type ConfigType = 'params' | 'header' | 'body';
export const SelConfigs: ConfigType[] = ['params', 'header', 'body'];

export type BodyType = 'form-data' | 'raw' | 'binary' | 'urlencoded';
export const BodyTypes: BodyType[] = ['urlencoded', 'form-data', 'raw', 'binary'];

export type BodyRawType = 'json' | 'text' | 'html' | 'javascript';
export const BodyRawTypes = ['json', 'text', 'html', 'javascript'];

export interface KVConfig {
  key: string;
  value: string | File;
  opt?: any;
}
export const DefaultHerderConfig: KVConfig[] = [
  { key: 'Accept', value: '*/*' },
  { key: 'Connection', value: 'keep-alive' }
];
export const InputContextMenus: Menus = [{ key: '复制' }, { key: '粘贴' }, { key: '清除' }];
