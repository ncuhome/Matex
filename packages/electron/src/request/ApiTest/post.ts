import {PostReqParams, ReqError} from '/@common/apiTest';
import {getReqAuthOptions} from '../utils/reqHandle';
import {MatexHttp} from '../../utils/Instance';
import {handleBody} from '../utils/handleBody';
import {Response} from "matexhttp";

export const doPost = async (props: PostReqParams):Promise<Response | ReqError> => {
  const { url } = props;
  const authOptions = getReqAuthOptions(props);
  const options = handleBody(props);
  if (options.error) {
    return options.error;
  }
  try {
    return await MatexHttp({
      method: 'Post',
      url,
      time: true,
      timeout: 10000,
      ...authOptions,
      ...options.value
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
