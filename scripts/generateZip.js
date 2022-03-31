import AdmZip from 'adm-zip';
import os from 'os';
import { resolve } from 'path';
import { ColorLog } from './colorLog.js';
import fs from 'fs';
import { promisify } from 'util';
import matexhttp from 'matexhttp';
import { matexTime, readJson } from './utils.js';
const ReqAsync = promisify(matexhttp);
import fileSize from 'filesize';
import * as DotEnv from 'dotenv';

DotEnv.config({ path: resolve(process.cwd(), './prod.env'), debug: false });
//服务器地址
const server = process.env.UPDATE_SERVER_URL;

/**
 *
 * @param {string} zipPath
 * @param {'win'|'mac'} os
 */
const updateMetaData = async (os, zipPath) => {
  console.log(zipPath);
  const version = (await readJson(resolve(process.cwd(), './package.json')))['version'];
  const size = fileSize(fs.statSync(zipPath).size);
  console.log(size);
  const metadata = JSON.stringify({
    version,
    size,
    os,
    update_time: matexTime().format('YYYY-MM-DD HH:mm:ss')
  });
  try {
    const res = await ReqAsync({
      url: `${server}update/metadata`,
      // url: 'http://localhost:7888/update/metadata',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: metadata
    });
    console.log(res.strBody);
  } catch (error) {
    ColorLog.error(error);
  }
};
/**
 *
 * @param {boolean} mac
 * @return {Promise<string>}
 */
const uploadZip = async (mac) => {
  let sourceDir;
  let targetPath;
  let uploadUrl;
  if (mac) {
    sourceDir = resolve(process.cwd(), './release/build/mac/Matex.app/Contents/Resources/app');
    targetPath = resolve(process.cwd(), './release/build/zip/mac.zip');
    uploadUrl = `${server}update/uploadMac`;
  } else {
    sourceDir = resolve(process.cwd(), './release/build/win-unpacked/resources/app');
    targetPath = resolve(process.cwd(), './release/build/zip/win.zip');
    uploadUrl = `${server}update/uploadWin`;
  }
  const zip = new AdmZip();
  zip.addLocalFolder(sourceDir, '');

  return new Promise((resolve) => {
    zip.writeZip(targetPath, async (err) => {
      if (err) {
        ColorLog.error('❤ 创建zip失败 ❤');
      } else {
        ColorLog.success('❤ 创建zip成功 ❤');
        const response = await ReqAsync({
          url: uploadUrl,
          method: 'POST',
          body: fs.readFileSync(targetPath)
        });
        const res = JSON.parse(response.strBody);
        if (res.status === 200) {
          ColorLog.success('❤ 上传成功 ❤');
          resolve(targetPath);
        } else {
          ColorLog.error('❤ 上传失败 ❤');
          resolve(null);
        }
      }
    });
  });
};

(async () => {
  if (!server) {
    return;
  }
  let targetPath;
  let osType;
  if (os.platform() === 'darwin') {
    targetPath = await uploadZip(true);
    osType = 'mac';
  } else if (os.platform() === 'win32') {
    targetPath = await uploadZip(false);
    osType = 'win';
  } else {
    throw new Error('❤ 不支持的操作系统 ❤');
  }
  await updateMetaData(osType, targetPath);
})();
