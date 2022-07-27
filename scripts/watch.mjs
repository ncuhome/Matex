import { spawn } from 'child_process'
import { createServer, build } from 'vite'
import electron from 'electron'
import {join, resolve} from "path";
import * as DotEnv from "dotenv";

DotEnv.config({ path: resolve(process.cwd(), './dev.env'), debug: true });
const parsed = new URL(import.meta.url)
const isDebug = parsed.searchParams.get('debug') // vscode
const RootPath = process.cwd()


/**
 *
 * @param viteDevServer {import('vite').ViteDevServer}
 * @returns {Promise<import('vite').RollupOutput | RollupOutput[] | RollupWatcher>}
 */
function watchMain(viteDevServer) {
  const protocol = `http${viteDevServer.config.server.https ? 's' : ''}:`;
  const host = viteDevServer.config.server.host || 'localhost';
  const port = viteDevServer.config.server.port;
  const path = '/';
  const url = `${protocol}//${host}:${port}${path}`;
  const env = Object.assign(process.env, {
    VITE_DEV_SERVER_URL: url
  });

  return build({
    configFile: join(RootPath,'electron/vite.config.ts'),
    mode: 'development',
    plugins: [isDebug ? null : {
      name: 'electron-main-watcher',
      writeBundle() {
        if (process.electronApp) {
          process.electronApp.removeAllListeners()
          process.electronApp.kill()
        }
        process.electronApp = spawn(electron, ['.'], { stdio: 'inherit', env })
        process.electronApp.once('exit', process.exit)
      },
    }].filter(Boolean),
    build: {
      watch: {},
    },
  })
}

/**
 *
 * @param server {import('vite').ViteDevServer}
 * @returns {Promise<import('vite').RollupOutput | RollupOutput[] | RollupWatcher>}
 */
function watchPreload(server) {
  return build({
    configFile: join(RootPath,'preload/vite.config.ts'),
    mode: 'development',
    plugins: [{
      name: 'electron-preload-watcher',
      writeBundle() {
        server.ws.send({ type: 'full-reload' })
      },
    }],
    build: {
      watch: {},
    },
  })
}

// 启动
const server = await createServer({ configFile: join(RootPath,'renderer/vite.config.ts') })
await server.listen()
await watchPreload(server)
await watchMain(server)
