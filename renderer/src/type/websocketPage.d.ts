import { WsSystemInfo } from '/@/model/ws.model';

export type WsSystemInfoFlag = 'good' | 'bad' | 'normal';

export interface WsMessage {
  index: number;
  type: 'server' | 'client' | 'system';
  message: any | WsSystemInfo;
  flag?: WsSystemInfoFlag;
  time: string;
}

export type WebsocketType = 'native' | 'socket.io';
