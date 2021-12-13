import { copyFileSync, existsSync } from 'fs-extra';
import path from 'path';
import signale from 'signale';

const buildPath = path.resolve(process.cwd(), './release/build/main/preload.js');
const preloadPath = path.resolve(process.cwd(), './electron/scripts/preload.js');

if (!existsSync(buildPath)) {
  try {
    copyFileSync(preloadPath, buildPath);
    signale.success('复制 preload.js 到 build/main 成功');
  } catch (e) {
    signale.error('复制失败');
  }
}
