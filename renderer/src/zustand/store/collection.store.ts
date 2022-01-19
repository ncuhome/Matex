import create from 'zustand';
import { BodyList, HeaderList, ParamList, UrlConfig } from '../type/collection.type';
import { produce } from 'immer';

const checkIndex = (list: any[]) => {
  return produce(list, (draft) => {
    draft.forEach((item, i) => {
      draft[i].index = i;
    });
  });
};

export const useParams = create<ParamList>((set) => ({
  paramList: [{ index: 0, key: '', value: '' }],
  addParam: (param) =>
    set(({ paramList }) => {
      const tempList = produce(paramList, (draft) => {
        draft.push(param);
      });
      return { paramList: checkIndex(tempList) };
    }),
  updateParam: (index, field, val) =>
    set((state) => {
      const tempList = produce(state.paramList, (draft) => {
        draft.forEach((item, i) => {
          if (item.index === index) {
            draft[index][field] = val;
          }
        });
      });
      return { paramList: checkIndex(tempList) };
    }),
  deleteParam: (index) =>
    set(({ paramList }) => {
      console.log(index);
      const tempList = produce(paramList, (draft) => {
        draft.splice(index, 1);
      });
      return { paramList: checkIndex(tempList) };
    })
}));

export const useHeaders = create<HeaderList>((set) => ({
  headerList: [
    { index: 0, key: 'Accept', value: '*/*' },
    { index: 1, key: 'Accept-Encoding', value: 'gzip, deflate, br' },
    { index: 2, key: 'Connection', value: 'keep-alive' }
  ],
  addHeader: (header) =>
    set(({ headerList }) => {
      const tempList = produce(headerList, (draft) => {
        draft.push(header);
      });
      return { headerList: checkIndex(tempList) };
    }),
  updateHeader: (index, field, val) =>
    set(({ headerList }) => {
      const tempList = produce(headerList, (draft) => {
        draft.forEach((item, i) => {
          if (item.index === index) {
            draft[index][field] = val;
          }
        });
      });
      return { headerList: checkIndex(tempList) };
    }),
  deleteHeader: (index) =>
    set(({ headerList }) => {
      console.log(index);
      const tempList = produce(headerList, (draft) => {
        draft.splice(index, 1);
      });
      return { headerList: checkIndex(tempList) };
    })
}));

export const useBodyList = create<BodyList>((set) => ({
  type: 'form-data',
  bodyList: [{ index: 0, key: '', value: '' }],
  raw: '',
  binary: { key: '', value: '' },
  setType: (type) => set({ type }),
  setRaw: (raw) => set({ raw }),
  setBinary: (binary) => set({ binary }),
  addBody: (body) =>
    set(({ bodyList }) => {
      const tempList = produce(bodyList, (draft) => {
        draft.push(body);
      });
      return { bodyList: checkIndex(tempList) };
    }),
  updateBody: (index, field, val) =>
    set(({ bodyList }) => {
      const tempList = produce(bodyList, (draft) => {
        draft.forEach((item, i) => {
          if (item.index === index) {
            draft[index][field] = val;
          }
        });
      });
      return { bodyList: checkIndex(tempList) };
    }),
  deleteBody: (index) =>
    set(({ bodyList }) => {
      console.log(index);
      const tempList = produce(bodyList, (draft) => {
        draft.splice(index, 1);
      });
      return { bodyList: checkIndex(tempList) };
    })
}));

export const useUrlConfig = create<UrlConfig>((set) => ({
  url: '',
  method: 'Get',
  activeTab: 'Params',
  setActiveTab: (tab) => set({ activeTab: tab }),
  setUrl: (url) => set({ url }),
  setMethod: (method) => set({ method })
}));
