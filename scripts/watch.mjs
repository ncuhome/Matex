import { exec, spawn } from 'child_process';
import { createServer, build } from 'vite';
import electron from 'electron';
import { join, resolve } from 'path';
import * as DotEnv from 'dotenv';
import { getDevPath } from './util.js';
import ora from 'ora';
import { performance } from 'perf_hooks';
import { round } from 'mathjs';
import chalk from 'chalk';

DotEnv.config({ path: resolve(process.cwd(), './dev.env'), debug: true });
const parsed = new URL(import.meta.url);
const isDebug = parsed.searchParams.get('debug'); // vscode
const RootPath = resolve(process.cwd(), 'packages');
const filterLog = /CoreText|Font/gi;

/**
 *
 * @param viteDevServer {import('vite').ViteDevServer}
 * @returns {Promise<import('vite').RollupOutput | RollupOutput[] | RollupWatcher>}
 */
function watchMain(viteDevServer) {
  const url = getDevPath(viteDevServer);
  const main_path = process.env.MAIN_PATH;
  const execStr = `electron ${main_path}`;
  let env = Object.assign(process.env, {
    VITE_DEV_SERVER_URL: url
  });

  return build({
    configFile: join(RootPath, 'electron/vite.config.ts'),
    mode: 'development',
    plugins: [
      isDebug
        ? null
        : {
            name: 'electron-main-watcher',
            writeBundle() {
              if (process.electronApp) {
                process.electronApp.removeAllListeners();
                process.electronApp.kill();
                env = Object.assign(env, {
                  RELOAD_MAIN: 'true'
                });
              }
              // process.electronApp = spawn(electron, ['.'], { stdio: 'inherit', env });
              startElectron(execStr, env).then((res) => {
                process.electronApp = res;
                process.electronApp.once('exit', process.exit);
              });
            }
          }
    ].filter(Boolean),
    build: {
      watch: {}
    }
  });
}

/**
 *
 * @param server {import('vite').ViteDevServer}
 * @returns {Promise<import('vite').RollupOutput | RollupOutput[] | RollupWatcher>}
 */
function watchPreload(server) {
  return build({
    configFile: join(RootPath, 'preload/vite.config.ts'),
    mode: 'development',
    plugins: [
      {
        name: 'electron-preload-watcher',
        writeBundle() {
          server.ws.send({ type: 'full-reload' });
        }
      }
    ],
    build: {
      watch: {}
    }
  });
}

/**
 *
 * @param {string} execPath
 * @param {NodeJS.ProcessEnv?} env
 * return {Promise<unknown>}
 */
const startElectron = async (execPath, env) => {
  const childProcess = await exec(execPath, {
    env: {
      ...env
    }
  });
  Log(childProcess);
  return childProcess;
};

/**
 *
 * @param {ChildProcess} childProcess
 * @constructor
 */
const Log = (childProcess) => {
  childProcess.stdout.on('data', (d) => {
    if (!filterLog.test(d)){
      d.toString().trim() && console.info(d.toString())
    }
  });
  childProcess.stderr.on('data', (d) => {
    if (!filterLog.test(d)) {
      console.error(d.toString());
    }
  });
};

// 启动
performance.mark('start');
const spinner = ora('启动开发服务器').start();

const server = await createServer({ configFile: join(RootPath, 'renderer/vite.config.ts') });
await server.listen();

spinner.succeed('启动开发服务器成功\n');
spinner.start('打包主进程和preload文件\n');
//打包监听主进程和preload文件
await watchPreload(server);
await watchMain(server);

spinner.succeed('主进程和preload文件打包成功\n');
performance.mark('end');
performance.measure('启动耗时', 'start', 'end');
const time = performance.getEntriesByName('启动耗时');
console.log(' · 本次启动耗时：', chalk.blue(round(time[0].duration, 2)), 'ms\n');
