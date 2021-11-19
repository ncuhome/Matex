import { myEmitter } from '../utils/EventEmiter';
import { MockData } from '../../src/pages/MockView';
import { saveByRedis } from '../scripts/redis';
import shell from 'shelljs';
import execa from 'execa';
import * as signale from 'signale';

shell.config.execPath = '/usr/local/bin/node';

const startServer = (scriptPath: string) => {
  let exist = false;
  try {
    myEmitter.on<MockData>('ulisten', async (mockData) => {
      await saveByRedis(mockData);
      try {
        const res = await execa.command('cat /Users/liqingdong/.pm2/pids/index-0.pid');
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
      const cmd = `pm2 start ${scriptPath} --name index --time`;
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
  const { stdout } = await execa.command('cat /Users/liqingdong/.pm2/pids/index-0.pid');
  try {
    await execa.command('pm2 stop index');
  } catch (e) {
    await execa.command(`kill -9 ${stdout}`);
    console.log('closeServer发生错误:', e);
  }
};

export { startServer, closeServer };
