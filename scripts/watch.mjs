import {spawn} from 'child_process'
import { createServer, build } from 'vite'
import electron from 'electron'
import {join, resolve} from "path";
import * as DotEnv from "dotenv";
import {ColorLog} from "./colorLog.js";
import {getDevPath} from "./util.js";

DotEnv.config({ path: resolve(process.cwd(), './dev.env'), debug: true });
const parsed = new URL(import.meta.url)
const isDebug = parsed.searchParams.get('debug') // vscode
const RootPath = resolve(process.cwd(),'packages')

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
    configFile: join(RootPath,'electron/vite.config.ts'),
    mode: 'development',
    plugins: [isDebug ? null : {
      name: 'electron-main-watcher',
      writeBundle() {
        if (process.electronApp) {
          process.electronApp.removeAllListeners()
          process.electronApp.kill()
          env = Object.assign(env,{
            RELOAD_MAIN:'true'
          })
          ColorLog.start('主进程重新打包')
        }
        process.electronApp = spawn(electron,['.'], { stdio:'inherit',env })
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
        ColorLog.start('渲染进程打包')
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
ColorLog.logo(server.config.server.port)
await watchPreload(server)
await watchMain(server)
