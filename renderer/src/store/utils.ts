import { produce } from 'immer';

export const checkIndex = (list: any[]) => {
  return produce(list, (draft) => {
    draft.forEach((item, i) => {
      draft[i].index = i;
    });
  });
};
