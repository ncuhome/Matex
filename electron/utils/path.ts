import * as path from 'path';

export const rootDir = process.cwd();
export const appDir = __dirname;
export const resolvePath = (_path: string) => path.resolve(appDir, _path);

export const ElectronBuildUrl = `file://${path.join(appDir, '..')}/render/index.html`;
