export type ResDataType = 'Plain Text' | 'JSON' | 'File' | 'Form Data';

interface ChannelEvents {
  loading;
  server;
}

export type ChannelEvent = keyof ChannelEvents;

export interface ApiData {
  id: number;
  route: string;
  type: ResDataType;
  resData: any;
  desc: string;
}

export interface ChannelData<T extends any> {
  type: keyof ChannelEvents;
  data: T;
}
