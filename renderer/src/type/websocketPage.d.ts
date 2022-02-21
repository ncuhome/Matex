export interface WsMessage {
  index: number;
  type: 'server' | 'client';
  message: any;
  time: string;
}
