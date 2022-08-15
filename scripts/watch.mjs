import { spawn } from 'child_process';
import { createServer, build } from 'vite';
import electron from 'electron';
import { join, resolve } from 'path';
import * as DotEnv from 'dotenv';
import { ColorLog } from './colorLog.js';
import { getDevPath } from './util.js';
import ora from 'ora';

DotEnv.config({ path: resolve(process.cwd(), './dev.env'), debug: true });
const parsed = new URL(import.meta.url);
const isDebug = parsed.searchParams.get('debug'); // vscode
const RootPath = resolve(process.cwd(), 'packages');

/**
 *
 * @param viteDevServer {import('vite').ViteDevServer}
 * @returns {Promise<import('vite').RollupOutput | RollupOutput[] | RollupWatcher>}
 */
function watchMain(viteDevServer) {
  const url = getDevPath(viteDevServer);
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
              process.electronApp = spawn(electron, ['.'], { stdio: 'inherit', env });
              process.electronApp.once('exit', process.exit);
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
console.time('本次启动耗时');
const spinner = ora('启动开发服务器').start();
// 启动
const server = await createServer({ configFile: join(RootPath, 'renderer/vite.config.ts') });
await server.listen();
spinner.succeed('启动开发服务器成功\n');
spinner.start('打包主进程和preload文件\n');
// ColorLog.logo(server.config.server.port)
await watchPreload(server);
await watchMain(server);
spinner.succeed('主进程和preload文件打包成功\n');
console.timeEnd('本次启动耗时');
console.log('\n');
