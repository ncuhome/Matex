import esbuild from 'esbuild';
import {nodeExternalsPlugin} from 'esbuild-node-externals';
import { exec } from 'child_process';
import { resolve } from 'path';
import * as DotEnv from 'dotenv';
import { ColorLog } from './colorLog.js';

//注入环境变量
DotEnv.config({ path: resolve(process.cwd(), './dev.env'), debug: true });

const mainOptions = {
  sourcemap: 'inline',
  minify: true, // 压缩代码
  bundle: true, // 打包模块
  format: 'cjs', // 输出为 common JS
  platform: 'node', // 平台 node
  outdir: '.dev/main', // 输出到 build 文件夹
  plugins: [nodeExternalsPlugin()], // 不把主进程代码中引用的 node_modules 包代码打进主进程代码里
  entryPoints: ['electron/src/main.ts'] // 入口文件
};

const preloadOptions = {
  sourcemap: 'inline',
  minify: true, // 压缩代码
  bundle: true, // 打包模块
  format: 'cjs', // 输出为 common JS
  platform: 'node', // 平台 node
  outdir: '.dev/preload', // 输出到 build 文件夹
  plugins: [nodeExternalsPlugin()], // 不把主进程代码中引用的 node_modules 包代码打进主进程代码里
  entryPoints: ['preload/src/index.ts'], // 入口文件
  watch: {
    onRebuild: (err) => {
      if (!err) {
        ColorLog.warn('preload代码变更，请刷新页面');
      }
    }
  }
};

const Log = (spawnProcess) =>{
  spawnProcess.stdout.on('data', d => d.toString().trim() && ColorLog.info(d.toString()));
  spawnProcess.stderr.on('data', d => {
    ColorLog.error(d.toString());
  });
};

/**
 *
 * @param {AbortController} processController
 * @param {ChildProcess} spawnProcess
 * @return {Promise<unknown>}
 */
const killProcess = async (processController,spawnProcess) => {
  let timer = null;
  return new Promise((resolve) => {
    timer = setInterval(() => {
      if (spawnProcess.killed) {
        clearInterval(timer);
        console.log('前一个进程已经被杀死');
        resolve();
      } else {
        spawnProcess.off('exit', process.exit);
        processController.abort();
        spawnProcess.kill('SIGINT');
      }
    }, 100);
  });
};

export const startWatchMainAndPreload = async (url)=>{
  const main_path = process.env.MAIN_PATH;
  const execStr = `cross-env VITE_DEV_SERVER_URL=${url} electron ${main_path}`;
  let processController = null;
  let spawnProcess = null;
  await esbuild.build(preloadOptions);
  ColorLog.success('preload打包完成');
  await esbuild.build({...mainOptions,watch: {
    onRebuild: async (err) => {
      if (!err) {
        if (spawnProcess!== null) {
          await killProcess(processController,spawnProcess);
          processController = null;
          spawnProcess = null;
          ColorLog.start('重启主进程');
        }
        processController = new AbortController();
        spawnProcess = await exec(execStr,{signal:processController.signal});
        Log(spawnProcess);
        spawnProcess.on('exit', process.exit);
      }
    }
  }});
  ColorLog.success('main打包完成');
  processController = new AbortController();
  spawnProcess =await exec(execStr,{signal:processController.signal});
  Log(spawnProcess);
};


