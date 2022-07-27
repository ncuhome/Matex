import { mockserver } from './app';
import { myEmitter } from '../utils/EventEmiter';
import { MatexLog } from '../core/log';

export const startServer = async () => {
  MatexLog.start('等待服务器启动');

  myEmitter.on('server', (msg) => {
    try {
      mockserver.addRoutes(['/users']);
      mockserver.startServer();
    } catch (e) {
      MatexLog.error(e);
    }
  });
};
