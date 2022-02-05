import { Timings } from '@szmarczak/http-timer';
import { Response } from 'got';
import { judgementType } from './judgement';
import { getDescription } from './statusCodeMapping';
import { ApiTestResProps } from '../../../../common';
import { Blob } from 'buffer';
import fileSize from 'filesize';

export const getResponse = (res: Response<string>): ApiTestResProps => {
  const type = judgementType(res.headers['content-type'] ?? 'text/plain');
  const timings = getTimings(res.timings);
  let size;
  try {
    size = parseInt(res.headers['content-length'] ?? new Blob([res.body]).size.toString());
  } catch (e) {
    console.log(e);
    size = 0;
  }
  return {
    type,
    desc: getDescription(res.statusCode),
    statusCode: res.statusCode,
    body: res.body,
    size: fileSize(size),
    headers: res.headers,
    timer: timings
  };
};

const getTimings = (timings: Timings) => {
  return {
    ['Socket-initialization']: timings.phases.wait,
    ['Dns-lookup']: timings.phases.dns,
    ['Tcp-connection']: timings.phases.tcp,
    ['First-byte']: timings.phases.firstByte,
    ['Download']: timings.phases.download,
    ['Total']: timings.phases.total
  };
};
