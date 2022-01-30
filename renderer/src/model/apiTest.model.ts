import { BodyItemType, BodyRawType, ResDisplayItemsType, TabItems } from '../type/apiTest';

export const MethodsOptions = ['Get', 'Post', 'Put', 'Delete'];

export const TabsItem: TabItems[] = ['Params', 'Headers', 'Body'];

export const FormatOptions = ['HTML', 'JSON', 'TEXT'];
export const ResDisplayItems: ResDisplayItemsType[] = ['Body', 'Headers', 'Cookies'];

export const Actions = ['Pretty', 'Raw', 'Preview'];
export const BodyTypes: BodyItemType[] = ['form-data', 'urlencoded', 'raw', 'binary'];
export const RawOptions: BodyRawType[] = ['text', 'json', 'html', 'javascript'];

export const InitHeaders = [
  { index: 0, key: 'Accept', value: '*/*' },
  { index: 1, key: 'Accept-Encoding', value: 'gzip, deflate, br' },
  { index: 2, key: 'Connection', value: 'keep-alive' }
];
