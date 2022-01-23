import { useChannel } from '../zustand/store/common.store';
import { useEffect, useState } from 'react';
import { ChannelData, ChannelEvent } from '../type/common';

export const usePortOn = <T>(channel: ChannelEvent) => {
  const { port } = useChannel((state) => state);
  const [data, setState] = useState<ChannelData<T> | null>(null);
  console.log(port);
  useEffect(() => {
    if (port) {
      port.onmessage = (e) => {
        const { type } = e.data as ChannelData<T>;
        if (type === channel) {
          setState(e.data);
        }
      };
    }
  }, []);

  return data;
};
