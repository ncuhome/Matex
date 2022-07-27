import { ChannelData } from '../type/common';
import { MatexWin } from '../global';

export const usePortChannel = <T>() => {
  const port = MatexWin.MessagePort;
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
