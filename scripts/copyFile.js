import { copyFileSync } from 'fs';
import { resolve } from 'path';
import { ColorLog } from './colorLog.js';

const loadingPath = resolve(process.cwd(), './assets/loading.html');
const loadingTarget = resolve(process.cwd(), './release/app/dist/render/loading.html');

const envPath = resolve(process.cwd(), './prod.env');
const envTargetPath = resolve(process.cwd(), './release/app/dist/main/prod.env');

try {
  copyFileSync(loadingPath, loadingTarget);
  ColorLog.success('loading.html 复制成功');

  copyFileSync(envPath, envTargetPath);
  ColorLog.success('prod.env 复制成功');
} catch (e) {
  ColorLog.error('复制失败');
  ColorLog.error(e);
}
