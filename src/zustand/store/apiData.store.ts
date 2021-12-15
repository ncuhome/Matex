import create from 'zustand';
import { ApiDataType, MessageChannel, MonacoEditorTypes } from '../type/apiData.type';
import { ApiData } from '../../type/api';
import { editor } from 'monaco-editor';

const initData: ApiData = {
  id: 1,
  route: '',
  type: 'JSON',
  resData: '',
  desc: ''
};
export const useApiDataStore = create<ApiDataType>((set) => ({
  apiList: [initData, initData, initData, initData],
  setApi: (index, key, value) =>
    set((state) => {
      const tempList: ApiData[] = [...state.apiList];
      // @ts-ignore
      tempList[index][key] = value;
      return { apiList: tempList };
    })
}));

export const useChannel = create<MessageChannel>((set) => ({
  port: null,
  setPort: (value) => set((state) => ({ port: value })),
  cleanPort: () => set((state) => ({ port: null }))
}));

export const useEditors = create<MonacoEditorTypes>((set) => ({
  editors: new Map<string, editor.IStandaloneCodeEditor | null>(),
  addEditor: (name, editor) =>
    set((state) => {
      const tempMap = new Map<string, editor.IStandaloneCodeEditor | null>(state.editors);
      tempMap.set(name, editor);
      return { editors: tempMap };
    }),
  deleteEditor: (name) =>
    set((state) => {
      const tempMap = new Map<string, editor.IStandaloneCodeEditor | null>(state.editors);
      tempMap.delete(name);
      return { editors: tempMap };
    })
}));
