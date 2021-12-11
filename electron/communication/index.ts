import { MessageEvent, MessagePortMain } from 'electron';
import * as signale from 'signale';
import { myEmitter } from '../utils/EventEmiter';
import { ChannelData } from '../type/api';

class PortChannel_ {
  portMain: MessagePortMain | null = null;

  setPort(port: MessagePortMain) {
    this.portMain = port;
  }

  postMessage<T>(type: ChannelData<T>['type'], data: ChannelData<T>['data']) {
    if (this.portMain) {
      this.portMain.postMessage({ type, data });
    }
  }

  startListening() {
    if (this.portMain) {
      this.portMain.on('message', (msg: MessageEvent) => {
        signale.success(msg);
        const { type, data } = msg.data as ChannelData<string>;
        myEmitter.emit('server', msg.data);
        if (type === 'server') {
          this.postMessage<string>('server', '启动成功');
        }
      });
      this.portMain.start();
    }
  }
}

export const PortChannel = new PortChannel_();
