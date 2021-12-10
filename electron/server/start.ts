import { mockserver } from './app';
import signale from 'signale';
import { myEmitter } from '../utils/EventEmiter';

// (async () => {
//   userServer();
// })();
export const startServer = async () => {
  signale.start('等待服务器启动');

  myEmitter.on('server', (msg) => {
    signale.await('startServer==:' + msg);
    try {
      mockserver.setRoutes(['/users']);
      mockserver.startServer();
      setTimeout(() => {
        mockserver.deleteServer();
      }, 15000);
    } catch (e) {
      signale.error(e);
    }
  });
};
