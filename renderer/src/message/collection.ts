import { useHeaders, useParams, useUrlConfig } from '../zustand/store/collection.store';
import { MatexWin } from '../global';
import { ApiTest_Channel } from '../../../common/ipc/channel';

export const useSendReq = () => {
  const { method, url } = useUrlConfig((state) => state);
  const { headerList } = useHeaders((state) => state);
  const { paramList } = useParams((state) => state);

  const sendReq = () => {
    const params = paramList.slice(0, paramList.length - 1);
    const headers = headerList.slice(0, paramList.length - 1);
    console.log(params);
    MatexWin.ipc?.send(ApiTest_Channel.Request, { url, method, params, headers });
  };

  return { sendReq };
};
