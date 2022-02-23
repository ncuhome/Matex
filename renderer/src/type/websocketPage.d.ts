import type { WsSystemInfo } from '/@/model/ws.model';
import type { Socket, Manager } from 'socket.io-client';

export type WsSystemInfoFlag = 'good' | 'bad' | 'normal';

export interface WsMessage {
  index: number;
  type: 'server' | 'client' | 'system';
  message: any | WsSystemInfo;
  flag?: WsSystemInfoFlag;
  time: string;
}

export type WebsocketType = 'native' | 'socket.io';

export type WsSocket = WsSocketIo | WebSocket | undefined;
export type WsStatus = 'connecting' | 'connected' | 'closing' | 'closed';

export interface WsSocketIo extends Socket {
  nsp: string;
  io: IO;
}

interface IO extends Manager {
  uri: string;
}
