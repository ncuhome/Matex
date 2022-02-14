import { MatexWin } from '/@/global';
import { ApiTest_Channel } from '/@common/ipc/channel';
import { useAtomValue } from 'jotai/utils';
import {
  apiTestActiveBodyTypeAtom,
  apiTestHeadersAtom,
  apiTestMethodAtom,
  apiTestParamsAtom,
  apiTestUrlAtom
} from '/@/store/apiTestStore';
import { usePost } from '/@/message/apiTest/utils';

export const useSendReq = () => {
  const method = useAtomValue(apiTestMethodAtom);
  const url = useAtomValue(apiTestUrlAtom);
  const paramList = useAtomValue(apiTestParamsAtom);
  const headerList = useAtomValue(apiTestHeadersAtom);
  const bodyType = useAtomValue(apiTestActiveBodyTypeAtom);
  const { handleFormData, handleUrlencoded, handleRaw } = usePost();

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
    switch (bodyType) {
      case 'form-data':
        handleFormData();
        break;
      case 'urlencoded':
        handleUrlencoded();
        break;
      case 'raw':
        handleRaw();
        break;
    }
  };

  return { sendReq };
};
