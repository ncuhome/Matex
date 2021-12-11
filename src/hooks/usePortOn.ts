import { useChannel } from '../zustand/store/apiData.store';
import { useEffect, useState } from 'react';
import { ChannelData, ChannelEvent } from '../type/api';

export const usePortOn = <T>(channel: ChannelEvent) => {
  const { port } = useChannel((state) => state);
  const [data, setState] = useState<ChannelData<T> | null>(null);

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
