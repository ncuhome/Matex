import { GetReqParams, KVList } from '/@common/apiTest';
import { getParamsObj } from '../utils/reqHandle';
import { MatexHttp } from '../../utils/Instance';
import {getResponse} from "../utils/resHandle";

export const doGet = async ({ url, params, headers }: GetReqParams) => {
  const paramObj = getParamsObj(params as KVList);
  const headerObj = getParamsObj(headers as KVList);
  console.log(url);
  try {
    const res = await MatexHttp({
      method: 'Get',
      url,
      time: true,
      timeout: 10000,
      headers: headerObj,
      qs: paramObj
    });
    return getResponse(res)
  } catch (e:any) {
    console.log(e);
    const { stack, errno, code, syscall, address, port } = e;
    return {
      type: 'error',
      errno,
      code,
      syscall,
      address,
      port,
      stack
    };
  }


};
