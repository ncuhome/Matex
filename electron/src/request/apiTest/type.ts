import type { BodyItemType } from '../../../../renderer/src/type/apiTest';
import { ApiTestReqProps } from '../../../../common';
import { BodyRawType } from '../../../../renderer/src/type/apiTest';

interface CollectionFetchProps {
  type: 'Get' | 'Post' | 'Put' | 'Delete';
  url: string;
  body: any;
  params: {
    [key: string]: any;
  };
  headers?: {
    'Content-Type': string;
    Authorization: string;
    [key: string]: string;
  };
}

export interface CommonReqParams {
  url: string;
  headers?: {
    [key: string]: string;
  };
}

export interface GetReqParams extends CommonReqParams {
  params?: ApiTestReqProps['params'];
}

export interface PostReqParams extends CommonReqParams {
  type: BodyItemType;
  rawType?: BodyRawType;
  body?: ApiTestReqProps['body'];
}
