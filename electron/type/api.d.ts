interface ChannelEvents {
  loading;
  server;
}

export interface ChannelData<T extends any> {
  type: keyof ChannelEvents;
  data: T;
}
