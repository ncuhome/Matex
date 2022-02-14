import { MatexWin } from '../global';
import { ApiTest_Channel } from '/@common/ipc/channel';
import { useAtomValue } from 'jotai/utils';
import {
  apiTestActiveBodyTypeAtom,
  apiTestFormDataAtom,
  apiTestHeadersAtom,
  apiTestMethodAtom,
  apiTestParamsAtom,
  apiTestUrlAtom
} from '../store/apiTestStore';
import { ContentTypeMapping } from '/@/utils/typeUtils';

export const useSendReq = () => {
  const method = useAtomValue(apiTestMethodAtom);
  const url = useAtomValue(apiTestUrlAtom);
  const paramList = useAtomValue(apiTestParamsAtom);
  const headerList = useAtomValue(apiTestHeadersAtom);
  const formDateList = useAtomValue(apiTestFormDataAtom);
  const bodyType = useAtomValue(apiTestActiveBodyTypeAtom);

  const headers: { [key: string]: string } = {};
  headerList.slice(0, headerList.length - 1).forEach((item) => {
    headers[item.key] = item.value;
  });

  const sendReq = () => {
    switch (method) {
      case 'Get':
        doGet();
        break;
      case 'Post':
        doPost();
        break;
    }
  };

  const doGet = () => {
    const paramsArr = paramList.slice(0, paramList.length - 1).map((item) => {
      return { [item.key]: item.value };
    });
    const params = {};
    paramsArr.forEach((item) => {
      Object.assign(params, item);
    });
    MatexWin.ipc?.send(ApiTest_Channel.Request, { url, method, params, headers });
  };

  const doPost = () => {
    headers['Content-Type'] = ContentTypeMapping.get(bodyType) ?? 'application/json';
    MatexWin.ipc?.send(ApiTest_Channel.Request, {
      url,
      method,
      body: formDateList.slice(0, formDateList.length - 1),
      headers
    });
  };

  return { sendReq };
};
