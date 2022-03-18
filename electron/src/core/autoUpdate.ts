import { EventEmitter } from 'events';
import { app } from 'electron';
import matexHttp from 'matexhttp';
import { promisify } from 'util';
import AdmZip from 'adm-zip';
import { resolve } from 'path';
import fs from 'fs';
import stream from 'stream';
import got from 'got';
import { AfterCheckRes, MetaData } from '../type/update';
import fileSize from 'filesize';

const ReqAsync = promisify(matexHttp);
const pipeline = promisify(stream.pipeline);

const dirPath = resolve(__dirname, '../../');
let fileName = 'app.zip';
const targetPath = resolve(dirPath, fileName);
const macUrl = 'http://159.75.220.253:7888/assets/mac/mac.zip';
const winUrl = 'http://159.75.220.253:7888/assets/win/win.zip';

class HotUpdate extends EventEmitter {
  oldVer: string;
  latestVer: string | undefined;
  constructor() {
    super();
    this.oldVer = app.getVersion();
  }
  async checkUpdate() {
    console.log('开始检查更新');
    const res = await ReqAsync({
      url: 'http://159.75.220.253:7888/update/check',
      method: 'GET'
    });
    const resData = JSON.parse(res.strBody as string);
    console.log(resData);
    const metadata = resData.data as MetaData;
    if (resData.code === 200) {
      if (metadata.version !== app.getVersion()) {
        this.emit('after-check', {
          isUpdate: true,
          version: metadata.version,
          size: metadata.size,
          os: metadata.os
        } as AfterCheckRes);
      } else {
        this.emit('after-check', {
          isUpdate: false,
          version: metadata.version,
          size: fileSize(parseInt(metadata.size)),
          os: metadata.os
        } as AfterCheckRes);
        console.log('没有更新');
      }
    } else {
      console.log('获取更新信息失败');
      console.log(resData.data);
    }
  }

  downFile(): Promise<boolean> {
    return new Promise((rsv) => {
      try {
        if (!fs.existsSync(dirPath)) {
          fs.mkdirSync(dirPath);
          console.log('文件夹创建成功');
        }
        let zipStream = fs.createWriteStream(targetPath);
        let url = '';
        if (process.platform === 'darwin') {
          url = macUrl;
        } else if (process.platform === 'win32') {
          url = winUrl;
        } else {
          console.log('不支持的操作系统');
          this.emit('update-error', '不支持的操作系统');
          rsv(false);
        }

        const gotStream = got.stream(url, { throwHttpErrors: false });
        this.on('cancel-update', () => {
          console.log('取消更新');
          gotStream.destroy();
        });

        gotStream.on('downloadProgress', (progress) => {
          console.log(progress);
          this.emit('download-progress', progress);
        });

        gotStream.on('error', (err) => {
          console.log('出现错误:', err);
          rsv(false);
        });
        gotStream.on('end', () => {
          console.log('文件[' + fileName + ']下载完毕');
          this.emit('update-downloaded', null);
        });
        pipeline(gotStream, zipStream);
      } catch (e) {
        this.emit('update-error', '' + e);
        console.log(e);
        rsv(false);
      }
    });
  }

  extractZip(): Promise<boolean> {
    return new Promise((rsv) => {
      try {
        const admZip = new AdmZip(targetPath);
        admZip.extractAllTo(resolve(dirPath, './'), true);
        console.log('文件[' + fileName + ']解压完毕');
        fs.unlinkSync(targetPath);
        rsv(true);
      } catch (e) {
        console.log(e);
        rsv(false);
      }
    });
  }
}

const HotUpdateInstance = new HotUpdate();

export default HotUpdateInstance;
