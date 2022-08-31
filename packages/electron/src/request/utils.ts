import http from 'http';
import type {Response} from 'got';
import {Global} from "../utils/Instance";


export const getGotModule = async () => {
  Global.Got= (await import('got')).default;
};

export const getHeaderSize = (res: Response) => {
  let rawHeaders =
    'HTTP/' + res.httpVersion + ' ' + res.statusCode + ' ' + http.STATUS_CODES[res.statusCode] + '\r\n';
  Object.keys(res.headers).forEach(function (headerKey) {
    rawHeaders += headerKey + ': ' + res.headers[headerKey] + '\r\n';
  });
  rawHeaders += '\r\n';
};
