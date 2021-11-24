import { ipcMain } from 'electron';
import { myEmitter } from '../utils/EventEmiter';
import { MockData } from './data';

const ipcName = 'ulisten';

const startIpc = () => {
  ipcMain.on(ipcName, (event, arg) => {
    myEmitter.emit<MockData>(ipcName, arg);
    event.reply(`${ipcName}-reply`, '我收到了');
  });
};

export default startIpc;
