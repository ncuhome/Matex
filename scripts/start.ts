import { exec, fork } from 'child_process';
import path from 'path';
import Signale from 'signale';

const parcelPath = path.resolve(__dirname, './parcel-dev.ts');

(() => {
  let running = false;
  exec('vite');
  const worker = fork(parcelPath, ['parcel']);
  worker.on('message', () => {
    if (!running) {
      Signale.start('开启nodemon');
      running = true;
      exec('nodemon --config nodemon-electron.json');
    }
  });
})();
