import type { BodyItemType } from '../../../../renderer/src/type/apiTest';
import { ApiTestReqProps, ApiTestResProps } from '../../../../common';

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
  body?: ApiTestReqProps['body'];
}
