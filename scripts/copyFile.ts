import { copyFileSync } from 'fs-extra';
import path from 'path';
import signale from 'signale';

const loadingPath = path.resolve(process.cwd(), './loading.html');
const preloadPath = path.resolve(process.cwd(), './electron/scripts/preload.js');

const preloadTarget = path.resolve(process.cwd(), './release/app/dist/main/preload.js');
const loadingTarget = path.resolve(process.cwd(), './release/app/dist/render/loading.html');
try {
  copyFileSync(preloadPath, preloadTarget);
  signale.success('复制 preload.js 到 build/main 成功');
  copyFileSync(loadingPath, loadingTarget);
  signale.success('复制 loading.html 到 build/render 成功');
} catch (e) {
  signale.error('复制失败');
  signale.error(e);
}
