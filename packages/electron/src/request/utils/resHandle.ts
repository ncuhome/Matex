import http from 'http';
import {Response} from 'matexhttp';
import {ApiTestRes} from '/@common/apiTest';
import {getResponseType, RawTypes} from './contentType';
import {Blob} from 'buffer';
import {getStatusMassage} from './statusMessage';
import fileSize from 'filesize';

export const getHeaderSize = (res: Response) => {
  let rawHeaders =
    'HTTP/' + res.httpVersion + ' ' + res.statusCode + ' ' + http.STATUS_CODES[res.statusCode] + '\r\n';
  Object.keys(res.headers).forEach(function (headerKey) {
    rawHeaders += headerKey + ': ' + res.headers[headerKey] + '\r\n';
  });
  rawHeaders += '\r\n';
  return Buffer.byteLength(rawHeaders, 'utf8');
};

export const getBodySize = (res: Response): number => {
  let size;
  try {
    size = parseInt(res.headers['content-length'] ?? new Blob([res.body]).size.toString());
  } catch (e) {
    console.log(e);
    size = 0;
  }
  return size;
};

export const getResponse = (res: Response): ApiTestRes => {
  const timer = getTimings(res.timingPhases);
  const resType = getResponseType(res.headers['content-type'] ?? 'text');
  const resBodySize = getBodySize(res);
  const resHeaderSize = getHeaderSize(res);
  return {
    type: resType,
    success: res.statusCode < 400 && res.statusCode >= 100,
    mimeType: res.headers['content-type'] ?? 'text/plain',
    timer,
    cookie: getCookie(res),
    statusCode: res.statusCode,
    statusMassage: getStatusMassage(res.statusCode),
    headers: res.headers,
    body: RawTypes.includes(resType) ? res.body : res.strBody,
    size: {
      resHeaderSize: fileSize(resHeaderSize),
      resBodySize: fileSize(resBodySize)
    }
  };
};

const getCookie = (res: Response) => {
  const cookieStringList = res.headers['set-cookie'] ?? [];
  if (cookieStringList.length === 0) {
    return [];
  }
  const hostname = new URL(res.socket['_httpMessage']['path']).hostname;
  const cookieList = cookieStringList.map((item) => {
    const cookieString = item.replace(/\s+/g, '');
    const cookieItem = cookieString.split(';');
    const obj = cookieItem.map((kv) => {
      const cookieKey = kv.split('=');
      return { [cookieKey[0]]: cookieKey[1] };
    });
    let cookieObj = {};
    obj.forEach((kv) => {
      cookieObj = Object.assign(cookieObj, kv);
    });
    return cookieObj;
  });
  return cookieList.map((cookie) => {
    const necessaryKeys = ['name', 'value', 'domain', 'path', 'expires','httponly', 'secure'];
    const defaultCookie = new Map<string, string>([
      ['domain', hostname],
      ['path', '/'],
      ['expires', 'session'],
      ['httponly', 'false'],
      ['secure', 'false']
    ]);
    const oldKeys = Object.keys(cookie);
    const name = oldKeys[0];
    const value = cookie[oldKeys[0]];
    delete cookie[oldKeys[0]];
    const obj = Object.assign({name, value}, cookie);
    const newObj = {}
    Object.keys(obj).forEach((key) => {
      newObj[key.toLowerCase()] = obj[key]
    })
    necessaryKeys.forEach((item) => {
      if (!newObj[item]) {
        newObj[item] = defaultCookie.get(item);
      }
    });
    return newObj;
  });
};

const getTimings = (timings: Response['timingPhases']): { key: string; time: string | number }[] => {
  return [
    { key: 'init-socket', time: parseFloat(timings!.wait?.toFixed(2) ?? '') },
    { key: 'dns-lookup', time: parseFloat(timings!.dns?.toFixed(2) ?? '') },
    { key: 'tcp-conn', time: parseFloat(timings!.tcp?.toFixed(2) ?? '') },
    { key: 'first-byte', time: parseFloat(timings!.firstByte?.toFixed(2) ?? '') },
    { key: 'download', time: parseFloat(timings!.download?.toFixed(2) ?? '') },
    { key: 'total', time: parseFloat(timings!.total?.toFixed(2) ?? '') }
  ];
};
