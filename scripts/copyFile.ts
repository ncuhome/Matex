import { copyFileSync } from 'fs-extra';
import path from 'path';
import signale from 'signale';

const buildPath1 = path.resolve(process.cwd(), './release/build/main/preload.js');
const preloadPath = path.resolve(process.cwd(), './electron/scripts/preload.js');
const buildPath2 = path.resolve(process.cwd(), './release/build/render/loading.html');
const loadingPath = path.resolve(process.cwd(), './loading.html');
try {
  copyFileSync(preloadPath, buildPath1);
  signale.success('复制 preload.js 到 build/main 成功');
  copyFileSync(loadingPath, buildPath2);
  signale.success('复制 loading.html 到 build/render 成功');
} catch (e) {
  signale.error('复制失败');
  signale.error(e);
}
