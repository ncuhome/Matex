import { GetReqParams, KVList, ReqError } from '/@common/apiTest';
import { getParamsObj, getReqAuthOptions } from '../utils/reqHandle';
import { MatexHttp } from '../../utils/Instance';
import { Response } from 'matexhttp';
import { VError } from 'verror';

export const doGet = async (props: GetReqParams): Promise<Response | ReqError> => {
  const { url, params } = props;
  const options = getReqAuthOptions(props);
  const paramObj = getParamsObj(params as KVList);
  if (options.qs) {
    options.qs = Object.assign(options.qs, paramObj);
  }
  try {
    return await MatexHttp({
      method: 'Get',
      url,
      time: true,
      timeout: 10000,
      ...options
    });
  } catch (e: any) {
    console.log(e);
    const { code } = e;
    const err = new VError(e, 'error "%s"', 'url');
    return {
      type: 'http',
      errorCode: code,
      desc: err.message
    };
  }
};
