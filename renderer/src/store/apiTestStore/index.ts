import { atom } from 'jotai';
import { useAtomValue, useUpdateAtom } from 'jotai/utils';
import { produce } from 'immer';
import { checkIndex } from '/@/store/utils';
import { InitHeaders } from '/@/model/apiTest.model';
import { BodyActionType, BodyItemType, BodyRawType, FormatType, ReqMethod, TabItems } from '/@/type/apiTest';
import { ApiTestKVProps, ApiTestReturnType } from '/@/store/apiTestStore/type';
import { ApiTestResProps } from '/@common/index';

export const apiTestParamsAtom = atom<ApiTestKVProps[]>([{ index: 0, key: '', value: '' }]);
export const apiTestHeadersAtom = atom<ApiTestKVProps[]>(InitHeaders);
export const apiTestBodyFormsAtom = atom<ApiTestKVProps[]>([{ index: 0, key: '', value: '' }]);

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
