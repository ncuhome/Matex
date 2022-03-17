import esbuild from 'esbuild';
import { nodeExternalsPlugin } from 'esbuild-node-externals';
import { exec } from 'child_process';
import { resolve } from 'path';
import * as DotEnv from 'dotenv';
import { ColorLog } from './colorLog.js';
import net from 'net';
import fs from 'fs';
import { EventEmitter } from 'events';

//注入环境变量
DotEnv.config({ path: resolve(process.cwd(), './dev.env'), debug: true });
const filterLog = /Font/gi;
const pipeFile = process.platform === 'win32' ? '\\\\.\\pipe\\matexPip' : '/tmp/unix.sock';
const ev = new EventEmitter();

const commonOption = {
  sourcemap: 'inline',
  minify: true, // 压缩代码
  bundle: true, // 打包模块
  format: 'cjs', // 输出为 common JS
  platform: 'node', // 平台 node
  plugins: [nodeExternalsPlugin()] // 不把主进程代码中引用的 node_modules 包代码打进主进程代码里
};

const mainOptions = {
  ...commonOption,
  outdir: '.dev/main', // 输出到 build 文件夹
  entryPoints: ['electron/src/main.ts'] // 入口文件
};

const preloadOptions = {
  ...commonOption,
  outdir: '.dev/preload', // 输出到 build 文件夹
  entryPoints: ['preload/src/index.ts'], // 入口文件
  watch: {
    onRebuild: (err) => {
      if (!err) {
        ColorLog.warn('preload代码变更，请刷新页面');
      }
    }
  }
};
/**
 *
 * @param {ChildProcess} childProcess
 * @constructor
 */
const Log = (childProcess) => {
  childProcess.stdout.on('data', (d) => d.toString().trim() && ColorLog.info(d.toString()));
  childProcess.stderr.on('data', (d) => {
    if (!filterLog.test(d)) {
      ColorLog.error(d.toString());
    }
  });
};

const createPip = () => {
  const server = net.createServer((connection) => {
    ColorLog.success('主进程已经启动');
    ev.emit('pipe', connection);
    connection.on('end', () => {
      ColorLog.start('主进程已经关闭');
    });
    connection.on('error', (err) => console.error(err.message));
  });
  try {
    if (fs.existsSync(pipeFile)) {
      fs.unlinkSync(pipeFile);
    }
  } catch (error) {
    console.log(error);
  }
  server.listen(pipeFile);
};

/**
 *
 * @param {net.Socket} pipConnection
 * @return {Promise<unknown>}
 */
const killProcess = async (pipConnection) => {
  if (!pipConnection) {
    ev.emit('noChild', null);
    return;
  }
  let timer = null;
  return new Promise((resolve) => {
    timer = setInterval(() => {
      if (pipConnection.destroyed) {
        clearInterval(timer);
        resolve();
      } else {
        pipConnection.end();
        pipConnection.destroy();
      }
    }, 10);
  });
};
/**
 *
 * @param {string} execPath
 * @param {NodeJS.ProcessEnv?} env
 * return {Promise<unknown>}
 */
const startElectron = async (execPath, env) => {
  const childProcess = await exec(execPath, {
    env: {
      ...process.env,
      ...env
    }
  });
  Log(childProcess);
  return childProcess;
};

/**
 * @param {string} url
 * @return {Promise<void>}
 */
export const startWatchMainAndPreload = async (url) => {
  const main_path = process.env.MAIN_PATH;
  const execStr = `cross-env VITE_DEV_SERVER_URL=${url} electron ${main_path}`;
  //electron进程控制变量
  let childProcess = null;
  let pipConnection = null;
  //监听主进程连接
  ev.on('pipe', (data) => {
    pipConnection = data;
  });
  ev.on('noChild', async () => {
    childProcess = await startElectron(execStr, {
      RELOAD_MAIN: 'true'
    });
  });
  // preload打包
  await esbuild.build(preloadOptions);
  ColorLog.success('preload打包完成');
  //主进程打包
  await esbuild.build({
    ...mainOptions,
    watch: {
      onRebuild: async (err) => {
        if (!err) {
          if (childProcess !== null) {
            await killProcess(pipConnection);
            childProcess = null;
            pipConnection = null;
            ColorLog.start('重启主进程');
          }
          childProcess = await startElectron(execStr, {
            RELOAD_MAIN: 'true'
          });
        }
      }
    }
  });
  ColorLog.success('main打包完成');
  childProcess = await startElectron(execStr);
  createPip();
};
