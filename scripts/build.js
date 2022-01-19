import { Parcel } from '@parcel/core';
import {resolve} from 'path';
import {ColorLog} from './colorLog.js';

const rootDir = process.cwd();
// 单个入口文件路径
const mainEntry = resolve(rootDir, './electron/src/main.ts');
const preloadEntry = resolve(rootDir, './preload/src/index.ts');
// Bundler 选项

const preloadBundler = new Parcel({
  entries: preloadEntry,
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
  targets: {
    main: {
      distDir: resolve(rootDir, './release/app/dist/main'),
      context: 'electron-main'
    }
  },
  defaultConfig: '@parcel/config-default'
});

(async () => {
  ColorLog.start('parcel开始打包 [preload]');
  const preloadEvent = await preloadBundler.run();
  // preloadEvent.bundleGraph.traverse(node => {
  //   console.log(node);
  // });
  if (preloadEvent.type === 'buildSuccess') {
    ColorLog.success('[preload] 打包完成');
  }
  ColorLog.start('parcel开始打包 [main]');
  const mainEvent = await mainBundler.run();
  // mainEvent.bundleGraph.traverse(node => {
  //   if (node.type==='asset'){
  //     console.log('-----------');
  //     console.log(node.value);
  //     console.log(mainEvent.bundleGraph.getDependencies(node.value));
  //   }
  // });
  if (mainEvent.type === 'buildSuccess') {
    ColorLog.success('[main] 打包完成');
  }
})();
