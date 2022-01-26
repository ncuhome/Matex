import { atom } from 'jotai';
import { useAtomValue, useUpdateAtom } from 'jotai/utils';
import { produce } from 'immer';
import { checkIndex } from '/@/store/utils';
import { InitHeaders } from '/@/model/apiTest.model';
import { ReqMethod, TabItems } from '/@/type/apiTest';
import { ApiTestHPProps, ApiTestReturnType } from '/@/store/apiTestStore/type';

export const apiTestParamsAtom = atom<ApiTestHPProps[]>([{ index: 0, key: '', value: '' }]);
export const apiTestHeadersAtom = atom<ApiTestHPProps[]>(InitHeaders);
export const apiTestUrlAtom = atom<string>('');
export const apiTestMethodAtom = atom<ReqMethod>('Get');
export const apiTestTabAtom = atom<TabItems>('Params');

const getUpdateAtom = (receivedAtom: any) => {
  return atom(null, (get, set, param: ApiTestHPProps) => {
    const tempList = produce(get<ApiTestHPProps[]>(receivedAtom), (draft) => {
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
  return atom(null, (get, set, param: Omit<ApiTestHPProps, 'index'>) => {
    const tempList = produce(get<ApiTestHPProps[]>(receivedAtom), (draft) => {
      draft.push({ index: draft.length, ...param });
    });
    set(receivedAtom, checkIndex(tempList));
  });
};

const getDeleteAtom = (receivedAtom: any) => {
  return atom(null, (get, set, index: number) => {
    const tempList = produce(get<ApiTestHPProps[]>(receivedAtom), (draft) => {
      draft.splice(index, 1);
    });
    set(receivedAtom, checkIndex(tempList));
  });
};

export const useApiTestConfig = (receivedAtom: any): ApiTestReturnType => {
  const list = useAtomValue<ApiTestHPProps[]>(receivedAtom);
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
