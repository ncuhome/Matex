import esbuild from 'esbuild';
import {nodeExternalsPlugin} from 'esbuild-node-externals';
import { ColorLog } from './colorLog.js';
import {syncDependencies} from './syncDependencies.js';

const mainOptions = {
  minify: true, // 压缩代码
  bundle: true, // 打包模块
  format: 'cjs', // 输出为 common JS
  platform: 'node', // 平台 node
  metafile:true,
  outdir: 'release/app/dist/main', // 输出到 build 文件夹
  plugins: [nodeExternalsPlugin()], // 不把主进程代码中引用的 node_modules 包代码打进主进程代码里
  entryPoints: ['electron/src/main.ts']// 入口文件
};

const preloadOptions = {
  minify: true, // 压缩代码
  bundle: true, // 打包模块
  format: 'cjs', // 输出为 common JS
  platform: 'node', // 平台 node
  metafile: true,
  outdir: 'release/app/dist/preload', // 输出到 build 文件夹
  plugins: [nodeExternalsPlugin()], // 不把主进程代码中引用的 node_modules 包代码打进主进程代码里
  entryPoints: ['preload/src/index.ts']
};

(async ()=>{
  await esbuild.build(preloadOptions);
  ColorLog.success('preload打包完成');
  await esbuild.build(mainOptions);
  ColorLog.success('main打包完成');
  ColorLog.start('❤开始同步依赖❤');
  await syncDependencies();
  ColorLog.success('❤同步依赖成功❤');
})();


