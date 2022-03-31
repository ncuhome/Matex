import { useCallback, useEffect, useRef, useState } from 'react';
import { Emitter } from '/@/utils/EventEmiter';
import { WebsocketType, WsStatus } from '/@/type/websocketPage';
import Emittery from 'emittery';

export const useWsStatus = () => {
  const [socketIo, setSocketIo] = useState<WsStatus>('未连接');
  const [wsNative, setWsNative] = useState<WsStatus>('未连接');
  const listenerRef1 = useRef<Emittery.UnsubscribeFn>();
  const listenerRef2 = useRef<Emittery.UnsubscribeFn>();

  useEffect(() => {
    listenerRef1.current = Emitter.on<WsStatus>('ws-native-status', (status) => {
      setWsNative(status);
    });
    listenerRef2.current = Emitter.on<WsStatus>('ws-socketio-status', (status) => {
      setSocketIo(status);
    });

    return () => {
      listenerRef1.current?.();
      listenerRef2.current?.();
    };
  }, []);

  return useCallback(
    (type: WebsocketType) => {
      if (type === 'socket io') {
        return socketIo;
      } else {
        return wsNative;
      }
    },
    [socketIo, wsNative]
  );
};
