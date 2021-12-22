interface ChannelEvents_ {
  loading;
  server;
  test;
}

export type ChannelEvents = keyof ChannelEvents_;

export interface ChannelData<T extends any> {
  type: ChannelEvents;
  data: T;
}
