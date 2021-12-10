interface ChannelEvents {
  loading;
}

export interface ChannelData<T extends any> {
  type: keyof ChannelEvents;
  data: T;
}
