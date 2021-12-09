import execa from 'execa';
import * as signale from 'signale';
import path from 'path';
import { myEmitter } from '../utils/EventEmiter';

const isDev = process.env.NODE_ENV === 'development';
const scriptPath = path.resolve(__dirname, isDev ? '../server/app.ts' : '../server/dist/app.js');

const startServer = () => {
  let exist = false;
  try {
    myEmitter.on<any>('ulisten', async (mockData) => {
      try {
        const res = await execa.command('cat /Users/liqingdong/.pm2/pids/app-0.pid');
        if (res) {
          exist = true;
        }
        signale.debug(res.stdout);
      } catch (e) {
        exist = false;
        console.log('startServer发生错误:', e);
      }
      if (exist) {
        await closeServer();
      }
      exist = false;
      const cmd = `pm2 start ${scriptPath} --name app --time`;
      setTimeout(async () => {
        await execa.command(cmd);
        exist = true;
      }, 1000);
    });
  } catch (e) {
    console.log('startServer发生错误:', e);
  }
};

const closeServer = async () => {
  const { stdout } = await execa.command('cat /Users/liqingdong/.pm2/pids/app-0.pid');
  try {
    await execa.command('pm2 stop app');
  } catch (e) {
    await execa.command(`kill -9 ${stdout}`);
    console.log('closeServer发生错误:', e);
  }
};

export { startServer, closeServer };
