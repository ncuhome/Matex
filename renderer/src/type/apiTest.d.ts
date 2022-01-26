import type { ApiTestReqProps } from '/@common/index';

export type TabItems = 'Params' | 'Body' | 'Headers';
export type ReqMethod = ApiTestReqProps['method'];
export type BodyItemType = 'form-data' | 'raw' | 'binary';
