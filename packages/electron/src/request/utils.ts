import http from 'http';
import type { Response } from 'got';
import { Global } from '../utils/Instance';
import { KVList } from '/@common/apiTest';

export const getGotModule = async () => {
  Global.Got = (await import('got')).default;
};

export const getHeaderSize = (res: Response) => {
  let rawHeaders =
    'HTTP/' + res.httpVersion + ' ' + res.statusCode + ' ' + http.STATUS_CODES[res.statusCode] + '\r\n';
  Object.keys(res.headers).forEach(function (headerKey) {
    rawHeaders += headerKey + ': ' + res.headers[headerKey] + '\r\n';
  });
  rawHeaders += '\r\n';
};

export const getParamsObj = (list: KVList): { [key: string]: string } => {
  let _obj={};
  if (list.length === 0) {
    _obj = {};
  }
  list.forEach((item) => {
    _obj = Object.assign(_obj, {
      [item.key]: item.value
    });
  });
  return _obj;
};
