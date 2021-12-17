import { exec, fork } from 'child_process';
import path from 'path';
import Signale from 'signale';
import WaitOn from 'wait-on';

const parcelPath = path.resolve(__dirname, './parcel-dev.ts');

const options: WaitOn.WaitOnOptions = {
  resources: ['tcp:3000'],
  delay: 1000, // initial delay in ms, default 0
  interval: 100, // poll interval in ms, default 250ms
  simultaneous: 1, // limit to 1 connection per resource at a time
  timeout: 30000, // timeout in ms, default Infinity
  tcpTimeout: 1000, // tcp timeout in ms, default 300ms
  window: 1000
};

(async () => {
  let running = false;
  const render = exec('vite');

  render.stdout?.on('data', (message: string) => {
    Signale.log(message);
  });
  render.stdout?.on('error', (message: string) => {
    Signale.error(message);
  });

  render.stderr?.on('error', (message: string) => {
    Signale.error(message);
  });
  render.stderr?.on('data', (message: string) => {
    Signale.error(message);
  });

  const worker = fork(parcelPath, ['parcel']);
  worker.on('message', async () => {
    if (!running) {
      Signale.start('开启nodemon');
      running = true;

      try {
        await WaitOn(options);

        const electron = exec('nodemon --config nodemon-electron.json');

        electron.stdout?.on('data', (message: string) => {
          Signale.log(message);
        });
        electron.stdout?.on('error', (message: string) => {
          Signale.error(message);
        });

        electron.stderr?.on('error', (message: string) => {
          Signale.error(message);
        });
        electron.stderr?.on('data', (message: string) => {
          Signale.error(message);
        });
      } catch (err) {
        Signale.error(err);
      }
    }
  });
})();
