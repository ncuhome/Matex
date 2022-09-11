import {GetReqParams, KVList, ReqError} from '/@common/apiTest';
import {getParamsObj, getReqAuthOptions} from '../utils/reqHandle';
import {MatexHttp} from '../../utils/Instance';
import {Response} from "matexhttp";

export const doGet = async (props: GetReqParams):Promise<Response | ReqError>  => {
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
    const { stack, errno, code, syscall } = e;
    return {
      type: 'http',
      errorCode:code,
      desc:syscall
    };
  }
};
