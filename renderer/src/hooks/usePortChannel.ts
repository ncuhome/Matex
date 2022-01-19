import { useChannel } from '../zustand/store/common.store';
import { ChannelData } from '../type/common';

export const usePortChannel = <T>() => {
  const { port } = useChannel((state) => state);

  const postMessage = <T>(type: ChannelData<T>['type'], data: ChannelData<T>['data']) => {
    try {
      port?.postMessage({ type, data });
    } catch (e) {
      console.error(e);
    }
  };

  return {
    postMessage,
    port
  };
};
