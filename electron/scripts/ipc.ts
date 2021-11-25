import { ipcMain } from 'electron';
import { MockData } from './data';
import { myEmitter } from '../utils/EventEmiter';

const ipcName = 'ulisten';

const startIpc = () => {
  ipcMain.on(ipcName, (event, arg) => {
    myEmitter.emit<MockData>(ipcName, arg);
    event.reply(`${ipcName}-reply`, '我收到了');
  });
};

export default startIpc;
