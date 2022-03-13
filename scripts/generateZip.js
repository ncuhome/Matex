import AdmZip from 'adm-zip';
import os from 'os';
import { resolve } from 'path';

(async () => {
  if (os.platform() === 'darwin') {
    const dir = resolve(process.cwd(), './release/build/mac/Matex.app/Contents/Resources/app');
    const zip = new AdmZip();
    zip.addLocalFolder(dir, 'app');
    zip.writeZip(resolve(process.cwd(), './release/build/zip/app.zip'));
  }
})();
