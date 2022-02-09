import type { ApiTestReqProps } from '/@common/index';

export type TabItems = 'Params' | 'Body' | 'Headers';
export type ReqMethod = ApiTestReqProps['method'];
export type BodyItemType = 'form-data' | 'raw' | 'binary' | 'urlencoded';
export type BodyActionType = 'Pretty' | 'Raw' | 'Preview';
export type BodyRawType = 'json' | 'text' | 'html' | 'javascript';
export type ResDisplayItemsType = 'Body' | 'Headers' | 'Cookies';
export type FormatType = 'HTML' | 'JSON' | 'TEXT';
