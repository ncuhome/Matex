import { GetReqParams, KVList } from '/@common/apiTest';
import { getParamsObj, getReqOptions } from '../utils/reqHandle';
import { MatexHttp } from '../../utils/Instance';
import { getResponse } from '../utils/resHandle';

export const doGet = async (props: GetReqParams) => {
  const { url } = props;
  const options = getReqOptions(props);
  console.log(options);
  try {
    const res = await MatexHttp({
      method: 'Get',
      url,
      time: true,
      timeout: 10000,
      ...options
    });
    return getResponse(res);
  } catch (e: any) {
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
