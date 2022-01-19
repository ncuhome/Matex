import * as path from 'path';

const isDev = process.env.NODE_ENV === 'development';

const envs = ['VITE_DEV_SERVER_URL','PRELOAD_PATH','LOADING_PATH'];

if (isDev){
  for (const e of envs) {
    if (!process.env[e]){
      console.error(`process.env.${e} do not set`);
      process.exit(1);
    }
  }
}

export const rootDir = process.cwd();
export const appDir = __dirname;
export const resolvePath = (_path: string) => path.resolve(appDir, _path);

export const resourcesPath = process.resourcesPath;

export const loadingPath = isDev
  ? `file://${path.resolve(rootDir, process.env.LOADING_PATH!)}`
  : `file://${path.join(__dirname, '..')}/render/loading.html`;

export const preloadPath = isDev
  ? path.resolve(process.cwd(), process.env.PRELOAD_PATH!)
  : `${path.resolve(__dirname, '../preload/index.js')}`;

export const mainPath = isDev
  ? process.env.VITE_DEV_SERVER_URL!
  : `file://${path.join(__dirname, '..')}/render/index.html`;
