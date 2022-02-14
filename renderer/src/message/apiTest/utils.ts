import { ApiTestReqProps, FormDataReq } from '/@common/index';
import { useAtomValue } from 'jotai/utils';
import {
  apiTestActiveBodyTypeAtom,
  apiTestBodyUrlencodedAtom,
  apiTestFormDataAtom,
  apiTestHeadersAtom,
  apiTestMethodAtom,
  apiTestUrlAtom
} from '/@/store/apiTestStore';
import { ContentTypeMapping } from '/@/utils/typeUtils';
import { MatexWin } from '/@/global';
import { ApiTest_Channel } from '/@common/ipc/channel';

export const usePost = () => {
  const method = useAtomValue(apiTestMethodAtom);
  const url = useAtomValue(apiTestUrlAtom);
  const headerList = useAtomValue(apiTestHeadersAtom);
  const formDateList = useAtomValue(apiTestFormDataAtom);
  const bodyType = useAtomValue(apiTestActiveBodyTypeAtom);
  const urlencodedList = useAtomValue(apiTestBodyUrlencodedAtom);

  const headers: { [key: string]: string } = {};
  headerList.slice(0, headerList.length - 1).forEach((item) => {
    headers[item.key] = item.value;
  });

  headers['Content-Type'] = ContentTypeMapping.get(bodyType) ?? 'application/json';

  const handleFormData = () => {
    const formData = formDateList.slice(0, formDateList.length - 1).map((item) => {
      const isFile = typeof item.value === 'object' && item.value instanceof File;
      return {
        key: item.key,
        isFile,
        value: isFile ? (item.value as File).path : item.value
      } as FormDataReq;
    });
    MatexWin.ipc?.send(ApiTest_Channel.Request, {
      url,
      method,
      type: bodyType,
      body: {
        formData
      },
      headers
    } as ApiTestReqProps);
  };

  const handleUrlencoded = () => {
    const urlencoded = {};
    urlencodedList.slice(0, urlencodedList.length - 1).forEach((item) => {
      urlencoded[item.key] = item.value;
    });

    MatexWin.ipc?.send(ApiTest_Channel.Request, {
      url,
      method,
      type: bodyType,
      body: {
        urlencoded
      },
      headers
    } as ApiTestReqProps);
  };

  return {
    handleFormData,
    handleUrlencoded
  };
};
