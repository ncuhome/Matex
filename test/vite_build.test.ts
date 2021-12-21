import WaitOn from 'wait-on';
import { exec } from 'child_process';
import Signale from 'signale';
import { chromium } from 'playwright';

const options: WaitOn.WaitOnOptions = {
  resources: ['tcp:5000'],
  delay: 1000, // initial delay in ms, default 0
  interval: 100, // poll interval in ms, default 250ms
  simultaneous: 1, // limit to 1 connection per resource at a time
  timeout: 30000, // timeout in ms, default Infinity
  tcpTimeout: 1000, // tcp timeout in ms, default 300ms
  window: 1000
};

(async () => {
  const render = exec('npm run build');

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

  render.on('exit', async (code) => {
    if (code === 0) {
      Signale.success('Build completed');
      const preview = exec('npm run preview');
      preview.stdout?.on('data', (message: string) => {
        Signale.log(message);
      });
      preview.stdout?.on('error', (message: string) => {
        Signale.error(message);
      });

      preview.stderr?.on('error', (message: string) => {
        Signale.error(message);
      });
      preview.stderr?.on('data', (message: string) => {
        Signale.error(message);
      });
      //启动截屏
      try {
        await WaitOn(options);
        const browser = await chromium.launch({ devtools: true });
        const page = await browser.newPage();
        await page.goto('http://localhost:5000');
        await page.screenshot({ path: './test/screenshot/vite_build.png' });
        await browser.close();
        process.exit(0);
      } catch (e) {
        Signale.error(e);
      }
    }
  });
})();
