import { WebsocketType } from '/@/type/websocketPage';

export const wsClientOptions: WebsocketType[] = ['native', 'socket.io'];

export const enum WsSystemInfo {
  connected = '连接成功',
  closed = '断开连接'
}
