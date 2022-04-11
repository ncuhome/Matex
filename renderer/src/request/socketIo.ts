import { io } from 'socket.io-client';
import { useAtom } from 'jotai';
import {
  socketIoChannelsAtom,
  socketIoConnAtom,
  useMsgList,
  websocketUrlAtom
} from '/@/store/websocketStore';
import { useEffect, useState } from 'react';
import { WsSocketIo, WsStatus } from '/@/type/websocketPage';
import { matexTime } from '/@/utils/time';
import { Emitter } from '/@/utils/EventEmiter';
import { useAtomValue } from 'jotai/utils';
import toast from 'react-hot-toast';

const getNowTime = () => {
  return matexTime().format('YYYY-MM-DD HH:mm:ss');
};

export const useSocketIo = () => {
  const [wsSocket, setSocket] = useAtom(socketIoConnAtom);
  const [status, setStatus] = useState<WsStatus>(wsSocket?.connected ? '已连接' : '未连接');
  const { addMsg } = useMsgList();
  const url = useAtomValue(websocketUrlAtom);
  const channels = useAtomValue(socketIoChannelsAtom);

  useEffect(() => {
    if (wsSocket?.connected) {
      channels.forEach((channel) => {
        if (channel.val !== 'message' && channel.listen) {
          if (channel.val.trim().length !== 0 && wsSocket?.listeners(channel.val).length === 0) {
            addEVListener(channel.val);
          }
        }
      });
    }
  }, [channels, wsSocket]);

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

  const connSocketIo = async () => {
    return new Promise((resolve) => {
      if (wsSocket && wsSocket.connected) {
        resolve(true);
        return;
      }
      if (url.trim().length === 0) {
        toast.error('连接地址不能为空');
        resolve(false);
        return;
      }
      console.log(url);
      const socket = io(url, {
        transports: ['websocket', 'polling'],
        reconnection: false
      });
      setStatus('连接中');

      socket.on('connect', () => {
        console.log('connect success');
        setSocket(socket as unknown as WsSocketIo);
        const time = matexTime().format('YYYY-MM-DD HH:mm:ss');
        addMsg({ type: 'system', flag: 'good', message: '建立连接', time });
        setTimeout(() => {
          setStatus('已连接');
        }, 100);
        resolve(true);
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
        const time = matexTime().format('YYYY-MM-DD HH:mm:ss');
        addMsg({ type: 'system', flag: 'bad', message: '断开连接', time });
        setSocket(undefined);
      });

      socket.on('connect_error', (err) => {
        console.log('connect error', err);
        toast.error(' 连接失败');
        resolve(false);
      });
    });
  };

  const closeSocketIo = () => {
    if (wsSocket) {
      setStatus('关闭中');
      wsSocket.close();
      setStatus('未连接');
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
