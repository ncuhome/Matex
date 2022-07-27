import { useAtom } from 'jotai';
import { useMsgList, websocketConnAtom, websocketUrlAtom } from '/@/store/websocketStore';
import { matexTime } from '/@/utils/time';
import { useEffect, useState } from 'react';
import { getStatusText } from '/@/pages/WebSocket/utils';
import { WsStatus } from '/@/type/websocketPage';
import { Emitter } from '/@/utils/EventEmiter';
import { useAtomValue } from 'jotai/utils';
import toast from 'react-hot-toast';

interface NativeWsProps {
  url: string;
  protocols?: string[];
  binaryType?: 'blob' | 'arraybuffer';
}

export const useNativeWs = () => {
  const [wsConn, setConn] = useAtom(websocketConnAtom);
  const initStatus = wsConn ? getStatusText(wsConn?.readyState) : '未连接';
  const url = useAtomValue(websocketUrlAtom);
  const [status, setStatus] = useState<WsStatus>(initStatus);
  const { addMsg } = useMsgList();


  useEffect(() => {
    Emitter.emit('ws-native-status', status);
  }, [status]);

  const connect = () => {
    return new Promise((resolve) => {
      if (wsConn && wsConn.readyState <= 1) {
        resolve(true);
        return;
      }
      if (url.trim().length === 0) {
        toast.error('连接地址不能为空');
        resolve(false);
        return;
      }
      const ws = new WebSocket(url);
      if (ws) {
        setStatus('连接中');
        ws.onopen = (e) => {
          console.log('ws connected');
          setConn(ws);
          const time = matexTime().format('YYYY-MM-DD HH:mm:ss');
          addMsg({ type: 'system', flag: 'good', message: '建立连接', time });
          setStatus('已连接');
          resolve(true);
        };
        ws.onmessage = (event) => {
          console.log('ws message', event);
          const time = matexTime().format('YYYY-MM-DD HH:mm:ss');
          addMsg({ ev: 'message', type: 'server', message: event.data, time });
        };

        ws.onclose = (event) => {
          console.log('ws closed', event);
          const time = matexTime().format('YYYY-MM-DD HH:mm:ss');
          addMsg({ type: 'system', flag: 'bad', message: '断开连接', time });
          setConn(undefined);
          setStatus('未连接');
        };

        ws.onerror = (event) => {
          console.log('ws error', event);
          toast.error('连接失败');
          resolve(false);
        };
      }
    });
  };

  const sendMsg = (content:string) => {
    if (wsConn&&wsConn.readyState === 1) {
      wsConn.send(content);
      addMsg({
        type: 'client',
        message: content,
        time: matexTime().format('YYYY-MM-DD HH:mm:ss')
      });
    } else {
      toast.error('未连接');
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
    sendMsg,
    connectWs: connect,
    closeWs: close
  };
};
