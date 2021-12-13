interface ChannelEvents {
  loading;
  server;
  test;
}

export interface ChannelData<T extends any> {
  type: keyof ChannelEvents;
  data: T;
}
