import { ApiTestReqProps, FormDataReq } from '/@common/index';
import { useAtomValue } from 'jotai/utils';
import {
  apiTestActiveBodyTypeAtom,
  apiTestBinaryAtom,
  apiTestBodyRawAtom,
  apiTestBodyUrlencodedAtom,
  apiTestFormDataAtom,
  apiTestHeadersAtom,
  apiTestMethodAtom,
  apiTestUrlAtom
} from '/@/store/apiTestStore';
import { ContentTypeMapping } from '/@/utils/typeUtils';
import { MatexWin } from '/@/global';
import { ApiTest_Channel } from '/@common/ipc/channel';
import { editorValueAtom } from '/@/store/commonStore';

export const usePost = () => {
  const method = useAtomValue(apiTestMethodAtom);
  const url = useAtomValue(apiTestUrlAtom);
  const headerList = useAtomValue(apiTestHeadersAtom);
  const formDateList = useAtomValue(apiTestFormDataAtom);
  const bodyType = useAtomValue(apiTestActiveBodyTypeAtom);
  const urlencodedList = useAtomValue(apiTestBodyUrlencodedAtom);
  const editorValues = useAtomValue(editorValueAtom);
  const activeRawType = useAtomValue(apiTestBodyRawAtom);
  const rawValue = editorValues.get('configBody') ?? '';
  const files = useAtomValue(apiTestBinaryAtom);

  const headers: { [key: string]: string } = {};
  headerList.slice(0, headerList.length - 1).forEach((item) => {
    headers[item.key] = item.value;
  });

  if (bodyType !== 'raw' && bodyType !== 'binary') {
    headers['Content-Type'] = ContentTypeMapping.get(bodyType) ?? 'application/json';
  } else {
    if (bodyType === 'raw') {
      headers['Content-Type'] = ContentTypeMapping.get(activeRawType) ?? 'application/json';
    }
  }

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

  const handleRaw = () => {
    MatexWin.ipc?.send(ApiTest_Channel.Request, {
      url,
      method,
      headers,
      type: bodyType,
      rawType: activeRawType,
      body: {
        rawValue
      }
    } as ApiTestReqProps);
  };

  const filePond: File[] = files.map((item) => {
    return item.file as File;
  });

  const handleBinary = () => {
    const type = filePond[0].type;
    if (type.trim()) {
      headers['Content-Type'] = filePond[0].type;
    } else {
      headers['Content-Type'] = 'text/plain';
    }
    MatexWin.ipc?.send(ApiTest_Channel.Request, {
      url,
      method,
      headers,
      type: bodyType,
      rawType: activeRawType,
      body: {
        binary: filePond[0].path
      }
    } as ApiTestReqProps);
  };

  return {
    handleFormData,
    handleUrlencoded,
    handleRaw,
    handleBinary
  };
};
