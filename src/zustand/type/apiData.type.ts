import { ApiData, ResDataType } from '../../type/api';

export interface ApiDataType {
  apiList: ApiData[];
  setApi: (index: number, key: string, value: any) => void;
}
