import { Parcel } from '@parcel/core';
import { resolve } from 'path';
import { ColorLog } from './colorLog.js';
import { addDependencies, verifyDep } from './syncDependencies.js';

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

(async () => {
  try {
    const dependencies = new Set();
    //preload打包
    ColorLog.start('parcel开始打包 [preload]');
    const preloadEvent = await preloadBundler.run();
    preloadEvent.bundleGraph.traverse((node) => {
      verifyDep(node.value.specifier) && dependencies.add(node.value.specifier);
    });
    if (preloadEvent.type === 'buildSuccess') {
      ColorLog.success('[preload] 打包完成');
    }
    //main打包
    ColorLog.start('parcel开始打包 [main]');
    const mainEvent = await mainBundler.run();
    mainEvent.bundleGraph.traverse((node) => {
      if (node.type !== 'asset') {
        verifyDep(node.value.specifier) && dependencies.add(node.value.specifier);
      }
    });
    if (mainEvent.type === 'buildSuccess') {
      ColorLog.success('[main] 打包完成');
    }
    const res = await addDependencies(dependencies);
    ColorLog.success('app 依赖同步完成');
    console.log('全部依赖如下:');
    console.log(res);
  } catch (e) {
    ColorLog.error(e);
  }
})();
