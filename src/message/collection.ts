import { useHeaders, useParams, useUrlConfig } from '../zustand/store/collection.store';
import { MatexWin } from '../global';

export const useSendReq = () => {
  const { method, url } = useUrlConfig((state) => state);
  const { headerList } = useHeaders((state) => state);
  const { paramList } = useParams((state) => state);

  const sendReq = () => {
    const params = paramList.slice(0, paramList.length - 1);
    const headers = headerList.slice(0, paramList.length - 1);
    console.log(params);
    MatexWin.ipc?.send('collection_req', { url, method, params, headers });
  };

  return { sendReq };
};
