import { ApiData } from '../../type/api';

export interface ApiDataType {
  apiList: ApiData[];
  setApi: (index: number, key: string, value: any) => void;
}

export interface MessageChannel {
  port: MessagePort | null;
  setPort: (port: MessagePort) => void;
  cleanPort: () => void;
}
