import http from 'http';
import { Response } from 'matexhttp';
import { ApiTestRes } from '/@common/apiTest';
import { getResponseType, RawTypes } from './contentType';
import { Blob } from 'buffer';
import { getStatusMassage } from './statusMessage';
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
