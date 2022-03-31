import { io } from 'socket.io-client';
import { useAtom } from 'jotai';
import { socketIoConnAtom, useMsgList } from '/@/store/websocketStore';
import { useEffect, useState } from 'react';
import { WsSocketIo, WsStatus } from '/@/type/websocketPage';
import { matexTime } from '/@/utils/time';
import { Emitter } from '/@/utils/EventEmiter';

const getNowTime = () => {
  return matexTime().format('YYYY-MM-DD HH:mm:ss');
};

export const useSocketIo = () => {
  const [wsSocket, setSocket] = useAtom(socketIoConnAtom);
  const [status, setStatus] = useState<WsStatus>(wsSocket?.connected ? '已连接' : '未连接');
  const { addMsg } = useMsgList();

  useEffect(() => {
    Emitter.emit('ws-socketio-status', status);
  }, [status]);

  const addEVListener = (ev: string) => {
    wsSocket?.on(ev, (data: any) => {
      addMsg({
        ev,
        type: 'server',
        message: data,
        time: getNowTime()
      });
    });
  };

  const connSocketIo = () => {
    const socket = io('http://localhost:9090?name=lqd', {
      transports: ['websocket', 'polling'],
      reconnection: false
    });
    setSocket(socket as unknown as WsSocketIo);
    setStatus('连接中');

    socket.on('connect', () => {
      console.log('connect success');
      const time = matexTime().format('YYYY-MM-DD HH:mm:ss');
      addMsg({ type: 'system', flag: 'good', message: '建立连接', time });
      setTimeout(() => {
        setStatus('已连接');
      }, 100);
    });

    socket.on('ping', (ev) => {
      console.log('ping', ev);
    });

    socket.onAny((event, ...args) => {
      console.log(event, args);
    });

    socket.on('message', (data: any) => {
      console.log('message', data);
      const time = matexTime().format('YYYY-MM-DD HH:mm:ss');
      addMsg({ ev: 'message', type: 'server', message: data, time });
    });

    socket.on('disconnect', () => {
      console.log('disconnect');
      setStatus('未连接');
      const time = matexTime().format('YYYY-MM-DD HH:mm:ss');
      addMsg({ type: 'system', flag: 'bad', message: '断开连接', time });
      setSocket(undefined);
    });

    socket.on('connect_error', (err) => {
      console.log('connect error', err);
    });
  };

  const closeSocketIo = () => {
    const ws = wsSocket;
    if (ws) {
      setStatus('关闭中');
      ws.close();
    } else {
      setStatus('未连接');
    }
  };

  return {
    addEVListener,
    closeSocketIo,
    connSocketIo
  };
};
