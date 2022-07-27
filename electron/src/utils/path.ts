import * as path from 'path';
import * as DotEnv from 'dotenv';
import { resolve } from 'path';
import { app } from 'electron';

export const isDev = process.env.NODE_ENV === 'development';

export const rootDir = process.cwd();
export const appDir = __dirname;
console.log(__dirname)
const envs = ['VITE_DEV_SERVER_URL', 'PRELOAD_PATH', 'LOADING_PATH'];

if (isDev) {
  for (const e of envs) {
    if (!process.env[e]) {
      console.error(`process.env.${e} do not set`);
      process.exit(1);
    }
  }
} else {
  DotEnv.config({ path: resolve(appDir, './prod.env') });
}

export const resourcesPath = process.resourcesPath;
export const documentsPath = resolve(app.getPath('documents'), './logo.txt');

export const loadingPath = isDev
  ? `file://${path.resolve(rootDir, process.env.LOADING_PATH!)}`
  : `file://${path.join(__dirname, process.env.LOADING_PATH ?? '../render/loading.html')}`;

export const preloadPath = isDev
  ? path.resolve(process.cwd(), process.env.PRELOAD_PATH!)
  : `${path.resolve(__dirname, process.env.PRELOAD_PATH ?? '../preload/index.cjs')}`;

export const mainPath = isDev
  ? process.env.VITE_DEV_SERVER_URL!
  : `file://${path.join(__dirname, process.env.MAIN_WINDOW_PATH ?? '../render/index.html')}`;
