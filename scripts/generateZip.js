import AdmZip from 'adm-zip';
import os from 'os';
import { resolve } from 'path';
import { ColorLog } from './colorLog.js';
import fs from 'fs';
import {promisify} from 'util';
import matexhttp from 'matexhttp';
const ReqAsync = promisify(matexhttp);


const server = process.argv[2];
(async () => {
  if (os.platform() === 'darwin') {
    const dir = resolve(process.cwd(), './release/build/mac/Matex.app/Contents/Resources/app');
    const zip = new AdmZip();
    zip.addLocalFolder(dir, 'app');
    const zipPath = resolve(process.cwd(), './release/build/zip/mac.zip');
    zip.writeZip(zipPath,async (err)=>{
      if (err) {
        ColorLog.error('❤ win创建zip失败 ❤');
      } else {
        ColorLog.success('❤ win创建zip成功 ❤');
        const response = await ReqAsync({
          url:`${server}/update/uploadMac`,
          method: 'POST',
          body: fs.readFileSync(zipPath)
        });
        console.log(response.strBody);
      }
    });
    ColorLog.success('❤ mac创建zip成功 ❤');
  } else if(os.platform() === 'win32') {
    const dir = resolve(process.cwd(), './release/build/win-unpacked/resources/app');
    const zip = new AdmZip();
    zip.addLocalFolder(dir, 'app');
    const zipPath = resolve(process.cwd(), './release/build/zip/win.zip');
    await zip.writeZip(zipPath,async (err) => {
      if (err) {
        ColorLog.error('❤ win创建zip失败 ❤');
      } else {
        ColorLog.success('❤ win创建zip成功 ❤');
        const response = await ReqAsync({
          url:`${server}/update/uploadWin`,
          method: 'POST',
          body: fs.readFileSync(zipPath)
        });
        console.log(response.strBody);
      }
    });
  } else {
    ColorLog.error('❤ 创建zip失败 ❤');
  }
})();
