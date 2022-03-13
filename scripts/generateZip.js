import AdmZip from 'adm-zip';
import os from 'os';
import { resolve } from 'path';
import { ColorLog } from './colorLog.js';

(async () => {
  if (os.platform() === 'darwin') {
    const dir = resolve(process.cwd(), './release/build/mac/Matex.app/Contents/Resources/app');
    const zip = new AdmZip();
    zip.addLocalFolder(dir, 'app');
    zip.writeZip(resolve(process.cwd(), './release/build/zip/app.zip'));
    ColorLog.success('❤ 创建zip成功 ❤');
  }
})();
