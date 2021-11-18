import { myEmitter } from '../utils/EventEmiter';
import { MockData } from '../../src/pages/Mock';
import { saveByRedis } from '../scripts/redis';
// import shell from 'shelljs';
import execa from 'execa';
// shell.config.execPath = '/usr/local/bin/node';

const startServer = (scriptPath: string) => {
  let exist = false;
  try {
    myEmitter.on<MockData>('ulisten', async (mockData) => {
      console.log('scriptPath====', scriptPath);
      await saveByRedis(mockData);
      await closeServer();
      exist = false;
      const cmd = `pm2 start ${scriptPath} --name index --time`;
      setTimeout(async () => {
        await execa.command(cmd);
        exist = true;
      }, 1000);
    });
  } catch (e) {
    console.log('发生错误:', e);
  }
};

const closeServer = async () => {
  try {
    await execa.command('pm2 stop index');
    await execa.command('pm2 stop all');
  } catch (e) {
    console.log('发生错误:', e);
  }
};

export { startServer, closeServer };
