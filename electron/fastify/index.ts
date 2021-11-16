import { myEmitter } from '../utils/EventEmiter';
import { MockData } from '../../src/pages/Mock';
import execa from 'execa';
const child_process = require('child_process');

const startFastify = () => {
  const fastify = require('fastify')({
    logger: true
  });

  myEmitter.on<MockData>('ulisten', async (mockData) => {
    console.log(myEmitter.listeners.length);
    const util = require('util');

    async function lsExample() {
      const execa = require('execa');
      const url = '/Users/liqingdong/WebstormProjects/ulisten_music/electron/shell/index.js';

      await execa.command('pm2 stop index');
      // await exec('pm2 stop index');
      const cmd = `pm2 start ${url} --name index`;
      const config = { detached: true, stdio: [0, 1, 2, 'ipc'] };
      await execa.command(cmd, config);
      // const subProcess = await exec(cmd, config);

      // subProcess.on('message', (data: any) => {
      //   console.log('收到消息' + data);
      // });
    }
    await lsExample();
  });

  const listen = () => {
    fastify.listen(8000, function (err: Error, address: string) {
      if (err) {
        fastify.log.error(err);
        process.exit(1);
      }
      fastify.log.info(`开始监听=> ${address}`);
    });
  };
};

export default startFastify;
