import { MessagePortMain } from 'electron';
import { ChannelData } from '../type/api';
import { CollectionIpc } from './collection.ipc';

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
    CollectionIpc.init();
  }
}

export const PortChannel = new PortChannel_();
