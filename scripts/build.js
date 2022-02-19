import { Parcel } from '@parcel/core';
import { resolve } from 'path';
import { ColorLog } from './colorLog.js';
import { addDependencies, verifyDep } from './syncDependencies.js';

//依赖
const dependencies = new Set();

const rootDir = process.cwd();
//main Entry
const mainEntry = resolve(rootDir, './electron/src/main.ts');
//preload Entry
const preloadEntry = resolve(rootDir, './preload/src/index.ts');

const preloadBundler = new Parcel({
  entries: preloadEntry,
  mode: 'production',
  env: {
    NODE_ENV: 'production'
  },
  targets: {
    preload: {
      distDir: resolve(rootDir, './release/app/dist/preload'),
      context: 'electron-main'
    }
  },
  defaultConfig: '@parcel/config-default'
});

//preload打包
(async () => {
  try {
    ColorLog.start('parcel开始打包 [preload]');
    const { bundleGraph, buildTime, type } = await preloadBundler.run();
    bundleGraph.traverse((node) => {
      verifyDep(node.value.specifier) && dependencies.add(node.value.specifier);
    });
    if (type === 'buildSuccess') {
      ColorLog.success(`[preload] 打包完成,done in ${buildTime}ms`);
    }
  } catch (e) {
    ColorLog.error(e);
  }
})();

const mainBundler = new Parcel({
  entries: mainEntry,
  mode: 'production',
  env: {
    NODE_ENV: 'production'
  },
  targets: {
    main: {
      distDir: resolve(rootDir, './release/app/dist/main'),
      context: 'electron-main'
    }
  },
  defaultConfig: '@parcel/config-default'
});

//main打包
(async () => {
  try {
    ColorLog.start('parcel开始打包 [main]');
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 2000);
    });
    const { bundleGraph, buildTime, type } = await mainBundler.run();
    bundleGraph.traverse((node) => {
      if (node.type !== 'asset') {
        verifyDep(node.value.specifier) && dependencies.add(node.value.specifier);
      }
    });
    if (type === 'buildSuccess') {
      ColorLog.success(`[main] 打包完成,done in ${buildTime}ms`);
    }
    const res = await addDependencies(dependencies);
    ColorLog.success('app 依赖同步完成');
  } catch (e) {
    ColorLog.error(e);
  }
})();
