import { PostReqParams } from '/@common/apiTest';
import { getReqAuthOptions } from '../utils/reqHandle';
import { MatexHttp } from '../../utils/Instance';
import { getResponse } from '../utils/resHandle';
import { handleBody } from '../utils/handleBody';

export const doPost = async (props: PostReqParams) => {
  try {
    const { url } = props;
    const authOptions = getReqAuthOptions(props);
    const options = handleBody(props);
    const res = await MatexHttp({
      method: 'Post',
      url,
      time: true,
      timeout: 10000,
      ...authOptions,
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
