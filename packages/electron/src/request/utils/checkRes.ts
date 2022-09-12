import { Response } from 'matexhttp';
import { ApiTestRes, ExactRes, ReqError } from '/@common/apiTest';
import { getBodySize, getCookie, getHeaderSize, getTimings } from './resHandle';
import { getResponseType, RawTypes } from './contentType';
import { getStatusMassage } from './statusMessage';
import fileSize from 'filesize';

export const getResponse = (res: Response): ExactRes => {
  const timer = getTimings(res.timingPhases);
  let resType = getResponseType(res.headers['content-type'] ?? 'text');
  const resBodySize = getBodySize(res);
  const resHeaderSize = getHeaderSize(res);
  let body: any;
  if (res.request.method.toLowerCase() === 'head') {
    body = 'head 请求无响应体内容';
    resType = 'text';
  } else {
    body = RawTypes.includes(resType) ? res.body : res.strBody;
  }

  return {
    type: resType,
    mimeType: res.headers['content-type'] ?? 'text/plain',
    timer,
    cookie: getCookie(res),
    statusCode: res.statusCode,
    statusMassage: getStatusMassage(res.statusCode),
    headers: res.headers,
    body,
    size: {
      resHeaderSize: fileSize(resHeaderSize),
      resBodySize: fileSize(resBodySize)
    }
  };
};

export const checkRes = (res: Response | ReqError): ApiTestRes => {
  if ((res as ReqError).errorCode) {
    return { isError: true, error: res as ReqError };
  } else {
    if ((res as Response).statusCode < 400) {
      return { isError: false, result: getResponse(res as Response) as ExactRes };
    } else {
      return {
        isError: true,
        error: {
          type: 'http',
          errorCode: (res as Response).statusCode.toString(),
          desc: getStatusMassage((res as Response).statusCode),
          httpErrorObj: {
            url: (res as Response).request.uri.href ?? '',
            headers: (res as Response).headers,
            size: {
              resHeaderSize: fileSize(getHeaderSize(res as Response)),
              resBodySize: '0 B'
            }
          }
        }
      };
    }
  }
};
