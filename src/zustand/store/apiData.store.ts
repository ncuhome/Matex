import create from 'zustand';
import { ApiDataType } from '../type/apiData.type';
import { ApiData } from '../../type/api';

const initData: ApiData = {
  id: 1,
  route: '',
  type: 'JSON',
  resData: '',
  desc: ''
};
export const useApiDataStore = create<ApiDataType>((set) => ({
  apiList: [initData],
  setApi: (index, key, value) =>
    set((state) => {
      const tempList: ApiData[] = [...state.apiList];
      // @ts-ignore
      tempList[index][key] = value;
      return { apiList: tempList };
    })
}));
