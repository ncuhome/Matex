import { copyFileSync } from 'fs';
import {resolve} from 'path';
import {ColorLog} from './colorLog.js';

const loadingPath = resolve(process.cwd(), './assets/loading.html');

const loadingTarget = resolve(process.cwd(), './release/app/dist/render/loading.html');

try {
  copyFileSync(loadingPath, loadingTarget);
  ColorLog.success('复制 loading.html 到 build/render 成功');
} catch (e) {
  ColorLog.error('复制失败');
  ColorLog.error(e);
}
