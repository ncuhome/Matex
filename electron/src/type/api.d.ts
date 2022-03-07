interface ChannelEvents_ {
  loading;
  server;
  test;
}

export type ChannelEvents = keyof ChannelEvents_;

export interface ChannelData<T> {
  type: ChannelEvents;
  data: T;
}
