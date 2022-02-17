import { atom, useAtom } from 'jotai';
import { useAtomValue, useUpdateAtom } from 'jotai/utils';
import { produce } from 'immer';
import { checkIndex } from '/@/store/utils';
import { InitHeaders } from '/@/model/apiTest.model';
import {
  BodyActionType,
  BodyItemType,
  BodyRawType,
  FormatType,
  ReqMethod,
  ResDisplayItemsType,
  TabItems
} from '/@/type/apiTest';
import { ApiTestFormData, ApiTestKVProps, ApiTestReturnType } from '/@/store/apiTestStore/type';
import { ApiTestResProps } from '/@common/index';
import type { FilePondFile } from 'filepond';

export const apiTestParamsAtom = atom<ApiTestKVProps[]>([{ index: 0, key: '', value: '' }]);
export const apiTestHeadersAtom = atom<ApiTestKVProps[]>(InitHeaders);
export const apiTestBinaryAtom = atom<FilePondFile[]>([]);
export const apiTestFormDataAtom = atom<ApiTestFormData[]>([{ index: 0, key: '', value: '' }]);
//header
export const apiTestUrlAtom = atom<string>('');
export const apiTestMethodAtom = atom<ReqMethod>('Get');
export const apiTestTabAtom = atom<TabItems>('Params');
//body
export const apiTestActiveBodyTypeAtom = atom<BodyItemType>('form-data');
export const apiTestBodyRawAtom = atom<BodyRawType>('text');
export const apiTestBodyUrlencodedAtom = atom<ApiTestKVProps[]>([{ index: 0, key: '', value: '' }]);
export const apiTestBodyFormatAtom = atom<FormatType>('JSON');
export const apiTestBodyActionAtom = atom<BodyActionType>('Pretty');
export const apiTestBodyDisplayAtom = atom<ResDisplayItemsType>('Body');

//response
export const apiTestResDataAtom = atom<ApiTestResProps | undefined>(undefined);

const getUpdateAtom = (receivedAtom: any) => {
  return atom(null, (get, set, param: ApiTestKVProps) => {
    const tempList = produce(get<ApiTestKVProps[]>(receivedAtom), (draft) => {
      draft.forEach((item, index) => {
        if (index === param.index) {
          draft.splice(index, 1, param);
        }
      });
    });
    set(receivedAtom, checkIndex(tempList));
  });
};

const getAddAtom = (receivedAtom: any) => {
  return atom(null, (get, set, param: Omit<ApiTestKVProps, 'index'>) => {
    const tempList = produce(get<ApiTestKVProps[]>(receivedAtom), (draft) => {
      draft.push({ index: draft.length, ...param });
    });
    set(receivedAtom, checkIndex(tempList));
  });
};

const getDeleteAtom = (receivedAtom: any) => {
  return atom(null, (get, set, index: number) => {
    const tempList = produce(get<ApiTestKVProps[]>(receivedAtom), (draft) => {
      draft.splice(index, 1);
    });
    set(receivedAtom, checkIndex(tempList));
  });
};

export const useApiTestConfig = (receivedAtom: any): ApiTestReturnType => {
  const list = useAtomValue<ApiTestKVProps[]>(receivedAtom);
  const updateList = useUpdateAtom(getUpdateAtom(receivedAtom));
  const addItem = useUpdateAtom(getAddAtom(receivedAtom));
  const deleteItem = useUpdateAtom(getDeleteAtom(receivedAtom));

  const updateListKey = (index: number, key: string) => {
    updateList({ index, key, value: list[index].value });
  };
  const updateListValue = (index: number, value: string) => {
    updateList({ index, key: list[index].key, value });
  };
  return [list, updateListKey, updateListValue, addItem, deleteItem];
};

export const useApiTestFormData = () => {
  const [formData, updateFormData] = useAtom(apiTestFormDataAtom);

  const updateFormDataKey = (index: number, key: string) => {
    const temp = produce(formData, (draft) => {
      draft[index].key = key;
    });
    updateFormData(checkIndex(temp));
  };

  const addFormData = (key: string, value: ApiTestFormData['value']) => {
    const temp = produce(formData, (draft) => {
      draft.push({ index: draft.length, key, value });
    });
    updateFormData(checkIndex(temp));
  };

  const deleteFormData = (index: number) => {
    const temp = produce(formData, (draft) => {
      draft.splice(index, 1);
    });
    updateFormData(checkIndex(temp));
  };

  const updateFormDataValue = (index: number, value: ApiTestFormData['value']) => {
    const temp = produce(formData, (draft) => {
      draft[index].value = value;
    });
    updateFormData(checkIndex(temp));
  };

  return {
    formData,
    updateFormDataKey,
    addFormData,
    deleteFormData,
    updateFormDataValue
  };
};

export const useUpdateBinary = () => {
  const [files, updateBinary] = useAtom(apiTestBinaryAtom);

  const addBinary = (file: FilePondFile) => {
    const tempList = produce(files, (draft) => {
      draft.splice(0, files.length, file);
    });
    updateBinary(tempList);
  };

  const deleteBinary = (id: string) => {
    const tempList = produce(files, (draft) => {
      draft.forEach((item, index) => {
        if (item.id === id) {
          draft.splice(index, 1);
        }
      });
    });
    updateBinary(tempList);
  };

  return {
    files,
    addBinary,
    deleteBinary
  };
};
