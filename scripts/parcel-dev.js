import { Parcel } from '@parcel/core';
import * as Path from 'path';
import { ColorLog } from './colorLog.js';
import { exec } from 'child_process';

const rootDir = process.cwd();
// 单个入口文件路径
const mainEntry = Path.resolve(rootDir, './electron/src/main.ts');
const preloadEntry = Path.resolve(rootDir, './preload/src/index.ts');
// Bundler 选项

const preloadBundler = new Parcel({
  entries: preloadEntry,
  targets: {
    preload: {
      sourceMap: true,
      distDir: Path.resolve(rootDir, './.dev/preload'),
      context: 'electron-main'
    }
  },
  defaultConfig: '@parcel/config-default'
});

const mainBundler = new Parcel({
  entries: mainEntry,
  targets: {
    main: {
      sourceMap: true,
      distDir: Path.resolve(rootDir, './.dev/main'),
      context: 'electron-main'
    }
  },
  defaultConfig: '@parcel/config-default'
});

export const startWatchMainAndPreload = async (url) => {
  const main_path = process.env.MAIN_PATH;
  const execStr = `cross-env VITE_DEV_SERVER_URL=${url} electron ${main_path}`;
  let processController = null;
  let spawnProcess = null;
  await preloadBundler.watch(async (err, buildEvent) => {
    if (err) {
      ColorLog.error(err);
      process.exit(1);
    }
    if (spawnProcess !== null) {
      ColorLog.start('parcel重新打包[preload]');
    } else {
      ColorLog.start('parcel开始打包[preload]');
    }
    if (buildEvent?.type === 'buildSuccess') {
      ColorLog.success('preload打包完成');
      await mainBundler.watch((err, buildEvent) => {
        if (err) {
          ColorLog.error(err);
          process.exit(1);
        }
        if (spawnProcess !== null) {
          processController.abort();
          spawnProcess = null;
          ColorLog.start('parcel重新打包[main]');
        } else {
          ColorLog.start('parcel开始打包[main]');
        }
        if (buildEvent?.type === 'buildSuccess') {
          ColorLog.success('main打包完成');
          processController = new AbortController();
          spawnProcess = exec(execStr,{signal:processController.signal});

          spawnProcess.stdout?.on('data', (msg) => {
            msg.toString().trim() && ColorLog.info(msg);
          });

          spawnProcess.stderr?.on('data', (d) => {
            const data = d.toString().trim();
            if (!data.toLowerCase().includes('font')) {
              ColorLog.error(data);
            }
          });
        } else {
          ColorLog.error('parcel打包失败');
        }
      });
    }
  });
};
