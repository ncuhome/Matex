import { judgementType, rawTypes } from './judgement';
import { getDescription } from './statusCodeMapping';
import { ApiTestResProps } from '../../../../common';
import { Blob } from 'buffer';
import fileSize from 'filesize';
import type { Response } from 'matexhttp';

export const getResponse = async (res: Response): Promise<ApiTestResProps> => {
  const type = judgementType(res.headers['content-type'] ?? 'text/plain');
  const timings = getTimings(res.timingPhases!);
  let size;
  try {
    size = parseInt(res.headers['content-length'] ?? new Blob([res.body]).size.toString());
  } catch (e) {
    console.log(e);
    size = 0;
  }
  return {
    type: res.headers['content-type'] ?? 'text/plain',
    desc: getDescription(res.statusCode),
    statusCode: res.statusCode,
    body: rawTypes.includes(type) ? res.body : res.strBody,
    size: fileSize(size),
    headers: res.headers,
    timer: timings
  };
};

const getTimings = (timings: {
  wait?: number;
  dns?: number;
  tcp?: number;
  tls?: number;
  request?: number;
  firstByte?: number;
  download?: number;
  total?: number;
}) => {
  return {
    ['init-socket']: parseFloat(timings.wait?.toFixed(2) ?? ''),
    ['dns-lookup']: parseFloat(timings.dns?.toFixed(2) ?? ''),
    ['tcp-conn']: parseFloat(timings.tcp?.toFixed(2) ?? ''),
    ['first-byte']: parseFloat(timings.firstByte?.toFixed(2) ?? ''),
    ['download']: parseFloat(timings.download?.toFixed(2) ?? ''),
    ['total']: parseFloat(timings.total?.toFixed(2) ?? '')
  };
};
