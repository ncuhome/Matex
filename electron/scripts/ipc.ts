import { ipcMain, MessagePortMain } from 'electron';
import * as signale from 'signale';
import { myEmitter } from '../utils/EventEmiter';

const startIpc = (port: MessagePortMain) => {
  signale.start('开始Ipc监听');
  port.on('message', (msg: any) => {
    signale.success(msg);
  });

  ipcMain.on('ipc', (event, arg) => {
    // signale.start(arg);
    myEmitter.emit('server', arg);
  });
};

export default startIpc;
