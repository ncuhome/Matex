import { useAtom } from 'jotai';
import { useMsgList, websocketNativeConnAtom } from '/@/store/websocketStore';
import { matexTime } from '/@/utils/time';
import { useEffect, useRef, useState } from 'react';
import { Emitter } from '/@/utils/EventEmiter';
import Emittery from 'emittery';

interface NativeWsProps {
  url: string;
  protocols?: string[];
  binaryType?: 'blob' | 'arraybuffer';
}

type WsStatus = 'connecting' | 'connected' | 'closing' | 'closed';

export const useNativeWs = () => {
  const [wsConn, setConn] = useAtom(websocketNativeConnAtom);
  const { addMsg } = useMsgList();
  const [status, serStatus] = useState<WsStatus>('closed');

  useEffect(() => {
    Emitter.emit('ws-native-status', status);
  }, [status]);

  const connect = ({ url, protocols, binaryType }: NativeWsProps) => {
    if (wsConn && wsConn.readyState <= 1) {
      return;
    }
    const ws = new WebSocket(url, protocols);
    if (binaryType) ws.binaryType = binaryType;

    if (ws) {
      setConn(ws);
      serStatus('connecting');
      ws.onopen = (e) => {
        console.log('ws open', e);
        serStatus('connected');
      };
      ws.onmessage = (event) => {
        console.log('ws message', event);
        const time = matexTime().format('YYYY-MM-DD HH:mm:ss');
        addMsg({ type: 'server', message: event.data, time });
      };

      ws.onclose = (event) => {
        console.log('ws close', event);
        setConn(undefined);
        serStatus('closed');
      };

      ws.onerror = (event) => {
        console.log('ws error', event);
      };
    }
  };

  const close = (code?: number, reason?: string) => {
    if (wsConn) {
      wsConn.close(code, reason);
      serStatus('closing');
    } else {
      serStatus('closed');
    }
  };
  return {
    connectWs: connect,
    closeWs: close,
    status
  };
};

export const useNativeWsStatus = () => {
  const [status, setStatus] = useState<WsStatus>('closed');
  const listenerRef = useRef<Emittery.UnsubscribeFn>();

  useEffect(() => {
    listenerRef.current?.();
    listenerRef.current = Emitter.on('ws-native-status', (status) => {
      setStatus(status);
    });
    return () => {
      listenerRef.current?.();
    };
  }, []);

  return status;
};
