import { useAtom } from 'jotai';
import { useMsgList, websocketConnAtom } from '/@/store/websocketStore';
import { matexTime } from '/@/utils/time';
import { useEffect, useState } from 'react';
import { getStatusText } from '/@/pages/WebSocket/utils';
import { WsStatus } from '/@/type/websocketPage';
import { Emitter } from '/@/utils/EventEmiter';

interface NativeWsProps {
  url: string;
  protocols?: string[];
  binaryType?: 'blob' | 'arraybuffer';
}

export const useNativeWs = () => {
  const [wsConn, setConn] = useAtom(websocketConnAtom);
  const initStatus = wsConn ? getStatusText(wsConn?.readyState) : '未连接';
  const { addMsg } = useMsgList();
  const [status, setStatus] = useState<WsStatus>(initStatus);

  useEffect(() => {
    localStorage.setItem('ws-native-status', status);
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
      setStatus('连接中');
      ws.onopen = (e) => {
        console.log('ws connected');
        const time = matexTime().format('YYYY-MM-DD HH:mm:ss');
        addMsg({ type: 'system', flag: 'good', message: '建立连接', time });
        setStatus('已连接');
      };
      ws.onmessage = (event) => {
        console.log('ws message', event);
        const time = matexTime().format('YYYY-MM-DD HH:mm:ss');
        addMsg({ ev: 'message', type: 'server', message: event.data, time });
      };

      ws.onclose = (event) => {
        console.log('ws closed');
        const time = matexTime().format('YYYY-MM-DD HH:mm:ss');
        addMsg({ type: 'system', flag: 'bad', message: '断开连接', time });
        setConn(undefined);
        setStatus('未连接');
      };

      ws.onerror = (event) => {
        console.log('ws error', event);
      };
    }
  };

  const close = (code?: number, reason?: string) => {
    if (wsConn) {
      wsConn.close(code, reason);
      setStatus('关闭中');
    } else {
      setStatus('未连接');
    }
  };

  return {
    connectWs: connect,
    closeWs: close
  };
};
