import create from 'zustand';
import { produce } from 'immer';
import { BodyList } from '/@/zustand/type/apiTest.type';

const checkIndex = (list: any[]) => {
  return produce(list, (draft) => {
    draft.forEach((item, i) => {
      draft[i].index = i;
    });
  });
};

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
