import { userServer } from './app';
import signale from 'signale';
import { myEmitter } from '../utils/EventEmiter';

// (async () => {
//   userServer();
// })();
export const startServer = async () => {
  signale.start('等待服务器启动');

  myEmitter.on('server', (msg) => {
    signale.await('startServer:' + msg);
    try {
      userServer();
    } catch (e) {
      signale.error(e);
    }
  });
};
