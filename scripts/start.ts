import { exec, fork } from 'child_process';
import path from 'path';
import Signale from 'signale';

const parcelPath = path.resolve(__dirname, './parcel-dev.ts');

(() => {
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
  worker.on('message', () => {
    if (!running) {
      Signale.start('开启nodemon');
      running = true;
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
    }
  });
})();
