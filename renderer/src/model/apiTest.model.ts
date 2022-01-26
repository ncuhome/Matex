import { BodyItemType, TabItems } from '../type/apiTest';

export const ResultOptions = ['JSON', 'Plain Text', 'File', 'Form Data', 'text/html'];
export const MethodsOptions = ['Get', 'Post', 'Put', 'Delete'];

export const TabsItem: TabItems[] = ['Params', 'Body', 'Headers'];

export const FormatOptions = ['HTML', 'JSON', 'TEXT'];

export const Actions = ['Pretty', 'Raw', 'Preview'];
export const BodyTypes: BodyItemType[] = ['form-data', 'raw', 'binary'];

export const InitHeaders = [
  { index: 0, key: 'Accept', value: '*/*' },
  { index: 1, key: 'Accept-Encoding', value: 'gzip, deflate, br' },
  { index: 2, key: 'Connection', value: 'keep-alive' }
];
