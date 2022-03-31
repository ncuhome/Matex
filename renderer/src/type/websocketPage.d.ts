import type { WsSystemInfo } from '/@/model/ws.model';
import type { Socket, Manager } from 'socket.io-client';

export type WsSystemInfoFlag = 'good' | 'bad' | 'normal';

export interface WsMessage {
  index: number;
  ev?: string;
  type: 'server' | 'client' | 'system';
  message: any | WsSystemInfo;
  flag?: WsSystemInfoFlag;
  time: string;
}

export type WebsocketType = 'native ws' | 'socket io';

export type WsStatus = '连接中' | '已连接' | '关闭中' | '未连接';

export interface WsSocketIo extends Socket {
  nsp: string;
  io: IO;
}

interface IO extends Manager {
  uri: string;
}
