import { myEmitter } from '../utils/EventEmiter';
import { MockData } from '../../src/pages/Mock';
import { saveByRedis } from '../scripts/redis';
import shell from 'shelljs';
shell.config.execPath = '/usr/local/bin/node';
const startFastify = () => {
  let exist = false;
  myEmitter.on<MockData>('ulisten', async (mockData) => {
    // const res = shell.exec('pm2 list', { silent: true }).stdout;

    await saveByRedis(mockData);
    const execa = require('execa');
    const url = '/Users/liqingdong/WebstormProjects/ulisten_music/electron/shell/index.js';
    await execa.command('pm2 stop index');
    exist = false;
    const cmd = `pm2 start ${url} --name index --time`;
    setTimeout(async () => {
      await execa.command(cmd);
      exist = true;
    }, 1000);
  });
};

export default startFastify;
