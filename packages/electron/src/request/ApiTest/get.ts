import { GetReqParams, KVList } from '/@common/apiTest';
import { getParamsObj } from '../utils';
import { promisify } from 'util';
import _matexhttp, { Response } from 'matexhttp';

const matexhttp = promisify(_matexhttp);

export const doGet = async ({ url, params, headers }: GetReqParams) => {
  const paramObj = getParamsObj(params as KVList);
  const headerObj = getParamsObj(headers as KVList);
  console.log(url);
  const res = await matexhttp({
    method: 'Get',
    url,
    time: true,
    timeout: 10000,
    headers: headerObj,
    qs: paramObj
  });
  console.log(Buffer.from(res.body ?? '', 'utf-8').toString());
  console.log(Buffer.from(res.strBody ?? '', 'utf-8').toString());
};
