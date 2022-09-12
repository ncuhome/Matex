import {PostReqParams, ReqError} from '/@common/apiTest';
import {getReqAuthOptions} from '../utils/reqHandle';
import {MatexHttp} from '../../utils/Instance';
import {handleBody} from '../utils/handleBody';
import {Response} from "matexhttp";
import {VError} from "verror";

export const doPut = async (props: PostReqParams):Promise<Response | ReqError> => {
  const { url } = props;
  const authOptions = getReqAuthOptions(props);
  const options = handleBody(props);
  if (options.error) {
    return options.error;
  }
  try {
    return await MatexHttp({
      method: 'Put',
      url,
      time: true,
      timeout: 10000,
      ...authOptions,
      ...options.value
    });
  } catch (e: any) {
    console.log(e);
    const {  code } = e;
    const err = new VError(e, 'error "%s"','url');
    return {
      type: 'http',
      errorCode:code,
      desc:err.message
    };
  }
};
