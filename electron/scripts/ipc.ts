import { ipcMain, MessagePortMain } from 'electron';
import * as signale from 'signale';
import { myEmitter } from '../utils/EventEmiter';
import { ChannelData } from '../type/api';

const startIpc = (port: MessagePortMain) => {
  signale.start('开始Ipc监听');
  port.on('message', (msg: any) => {
    signale.success(msg);
  });
  port.start();
  ipcMain.on('ipc', (event, arg) => {
    // signale.start(arg);
    myEmitter.emit('server', arg);
  });
};

export default startIpc;

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
}

export const PortChannel = new PortChannel_();
