import { useAtom } from 'jotai';
import { useMsgList, websocketConnAtom } from '/@/store/websocketStore';
import { matexTime } from '/@/utils/time';
import { SetStateAction, useEffect, useRef, useState } from 'react';
import { Emitter } from '/@/utils/EventEmiter';
import Emittery from 'emittery';
import { getStatusText } from '/@/pages/WebSocket/utils';
import { useAtomValue } from 'jotai/utils';
import { WsStatus } from '/@/type/websocketPage';

interface NativeWsProps {
  url: string;
  protocols?: string[];
  binaryType?: 'blob' | 'arraybuffer';
}

type WsConnNativeAtom = [WebSocket, (update?: SetStateAction<WebSocket>) => void];

export const useNativeWs = () => {
  const [wsConn, setConn] = useAtom(websocketConnAtom) as WsConnNativeAtom;
  const initStatus = wsConn ? getStatusText(wsConn?.readyState) : 'closed';
  const { addMsg } = useMsgList();
  const [status, setStatus] = useState<WsStatus>(initStatus);

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
      setStatus('connecting');
      ws.onopen = (e) => {
        console.log('ws connected');
        const time = matexTime().format('YYYY-MM-DD HH:mm:ss');
        addMsg({ type: 'system', flag: 'good', message: '建立连接', time });
        setStatus('connected');
      };
      ws.onmessage = (event) => {
        console.log('ws message', event);
        const time = matexTime().format('YYYY-MM-DD HH:mm:ss');
        addMsg({ type: 'server', message: event.data, time });
      };

      ws.onclose = (event) => {
        console.log('ws closed');
        const time = matexTime().format('YYYY-MM-DD HH:mm:ss');
        addMsg({ type: 'system', flag: 'bad', message: '断开连接', time });
        setConn(undefined);
        setStatus('closed');
      };

      ws.onerror = (event) => {
        console.log('ws error', event);
      };
    }
  };

  const close = (code?: number, reason?: string) => {
    if (wsConn) {
      wsConn.close(code, reason);
      setStatus('closing');
    } else {
      setStatus('closed');
    }
  };

  return {
    connectWs: connect,
    closeWs: close
  };
};

export const useNativeWsStatus = () => {
  const wsConn = useAtomValue(websocketConnAtom) as WebSocket;
  const initStatus = wsConn ? getStatusText(wsConn?.readyState) : 'closed';
  const [status, setStatus] = useState<WsStatus>(initStatus);
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
