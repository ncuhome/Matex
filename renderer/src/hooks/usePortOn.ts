import { useEffect, useState } from 'react';
import { ChannelData, ChannelEvent } from '../type/common';
import { MatexWin } from '../global';

export const usePortOn = <T>(channel: ChannelEvent) => {
  const [data, setState] = useState<ChannelData<T> | null>(null);
  const port = MatexWin.MessagePort;
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
