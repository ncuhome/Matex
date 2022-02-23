import { Manager, io } from 'socket.io-client';
import { useAtom } from 'jotai';
import { useMsgList, websocketConnAtom } from '/@/store/websocketStore';
import { SetStateAction, useEffect, useState } from 'react';
import { WsSocketIo, WsStatus } from '/@/type/websocketPage';
import { Socket } from 'socket.io-client';
import { matexTime } from '/@/utils/time';
import { Emitter } from '/@/utils/EventEmiter';
import { useAtomValue } from 'jotai/utils';

type WsConnSocketIoAtom = [Socket | undefined, (update?: SetStateAction<Socket>) => void];

export const useSocketIo = () => {
  const [wsSocket, setSocket] = useAtom(websocketConnAtom) as WsConnSocketIoAtom;
  const [status, setStatus] = useState<WsStatus>(wsSocket?.connected ? 'connected' : 'closed');
  const { addMsg } = useMsgList();

  useEffect(() => {
    Emitter.emit('ws-native-status', status);
  }, [status]);

  const connSocketIo = () => {
    const socket = io('http://localhost:9090?name=lqd', {
      transports: ['websocket', 'polling'],
      reconnection: false
    });
    setSocket(socket);
    setStatus('connecting');

    socket.on('connect', () => {
      console.log('connect success');
      const time = matexTime().format('YYYY-MM-DD HH:mm:ss');
      addMsg({ type: 'system', flag: 'good', message: '建立连接', time });
      setStatus('connected');
      Emitter.emit('ws-socketio-status', socket);
    });

    socket.on('message', (data: any) => {
      console.log('message', data);
      const time = matexTime().format('YYYY-MM-DD HH:mm:ss');
      addMsg({ type: 'server', message: data, time });
    });

    socket.on('disconnect', () => {
      console.log('disconnect');
      setStatus('closed');
      const time = matexTime().format('YYYY-MM-DD HH:mm:ss');
      addMsg({ type: 'system', flag: 'bad', message: '断开连接', time });
      setSocket(undefined);
    });

    socket.on('connect_error', (err) => {
      console.log('connect error', err);
    });
  };

  const closeSocketIo = () => {
    const ws = wsSocket as Socket;
    if (ws) {
      ws.close();
      setStatus('closing');
    } else {
      setStatus('closed');
    }
  };

  return {
    closeSocketIo,
    connSocketIo
  };
};

export const useSocketIoInfo = () => {
  const [socketId, setSocketId] = useState('');

  useEffect(() => {
    Emitter.on('ws-socketio-status', (data) => {
      const { id } = data as Socket;
      if (data instanceof Socket) {
        setSocketId(id);
      }
    });
  }, []);

  return [socketId];
};
