import WaitOn from 'wait-on';
import { exec } from 'child_process';
import Signale from 'signale';
import { chromium } from 'playwright';

const options: WaitOn.WaitOnOptions = {
  resources: ['tcp:5000'],
  delay: 1000, // initial delay in ms, default 0
  interval: 100, // poll interval in ms, default 250ms
  simultaneous: 1, // limit to Mock connection per resource at a time
  timeout: 30000, // timeout in ms, default Infinity
  tcpTimeout: 1000, // tcp timeout in ms, default 300ms
  window: 1000
};

(async () => {
  const preview = exec('npm run preview');

  preview.stdout?.on('data', (message: string) => {
    Signale.log(message);
  });

  preview.stderr?.on('data', (message: string) => {
    Signale.error(message);
  });
  //启动截屏
  try {
    await WaitOn(options);
    const browser = await chromium.launch({
      headless: false,
      devtools: false
    });
    const context = await browser.newContext();
    // Open new page
    const page = await context.newPage();
    // Go to http://localhost:3000/
    await page.goto('http://localhost:5000/');
    // Go to http://localhost:3000/#/login
    await page.goto('http://localhost:5000/#/login');
    // Click text=登录页面
    await page.click('text=点我登录');
    // assert.equal(page.url(), 'http://localhost:3000/#/apiTest');
    // Click text=Params
    await page.click('text=Params');
    // await page.waitForTimeout(1000);
    // await page.screenshot({ path: './test/screenshot/screenshot.png' });
    // console.log('截图成功');
    // assert.equal(page.url(), 'http://localhost:3000/#/apiTest/params');
    // Click text=Headers
    await page.click('text=Headers');
    // assert.equal(page.url(), 'http://localhost:3000/#/apiTest/headers');
    // Click text=Body
    await page.click('text=Body');
    // assert.equal(page.url(), 'http://localhost:3000/#/apiTest/body');
    // Click #root div div >> :nth-match(div:has-text("虚拟接口"), 4)
    await page.click('#root div div >> :nth-match(div:has-text("websocket"), 4)');
    // assert.equal(page.url(), 'http://localhost:3000/#/mock');
    // Click text=压力测试
    await page.click('text=压力测试');
    // assert.equal(page.url(), 'http://localhost:3000/#/benchmark');
    // Click text=敬请期待
    await page.click('text=敬请期待');
    // assert.equal(page.url(), 'http://localhost:3000/#/ok');
    // ---------------------
    await context.close();
    await browser.close();
    process.exit(0);
  } catch (e) {
    Signale.error(e);
  }
})();
