import { EventEmitter } from 'events';
import { app, dialog } from 'electron';
import matexHttp from 'matexhttp';
import { promisify } from 'util';
import AdmZip from 'adm-zip';
import { resolve } from 'path';
import fs from 'fs';
import stream from 'stream';
import got from 'got';

const ReqAsync = promisify(matexHttp);
const pipeline = promisify(stream.pipeline);

interface MetaData {
  version: string;
  size: string;
  os: 'win' | 'mac';
}

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
    if (resData.code === 200) {
      const metadata = resData.data as MetaData;
      if (metadata.version !== app.getVersion()) {
        this.emit('after-check', true);
        const res = await this.downFile();
        if (res) {
          console.log('更新完成,即将重启');
          app.relaunch();
          app.exit(0);
        } else {
          await dialog.showMessageBox({
            type: 'error',
            title: '提示',
            message: '更新失败',
            buttons: ['确定']
          });
        }
      } else {
        this.emit('after-check', false);
        console.log('暂无更新');
      }
    } else {
      this.emit('after-check', false);
      console.log('获取更新信息失败');
      console.log(resData.data);
    }
  }

  downFile(): Promise<boolean> {
    return new Promise((rsv) => {
      console.log('开始下载更新文件');
      try {
        const dirPath = resolve(__dirname, '../../');
        if (!fs.existsSync(dirPath)) {
          fs.mkdirSync(dirPath);
          console.log('文件夹创建成功');
        }
        let fileName = 'app.zip';
        let macUrl = 'http://159.75.220.253:7888/assets/mac/mac.zip';
        let winUrl = 'http://159.75.220.253:7888/assets/win/win.zip';
        const targetPath = resolve(dirPath, fileName);
        let zipStream = fs.createWriteStream(targetPath);
        let url = '';
        if (process.platform === 'darwin') {
          url = macUrl;
        } else if (process.platform === 'win32') {
          url = winUrl;
        } else {
          console.log('不支持的操作系统');
          rsv(false);
        }

        const gotStream = got.stream(url, { throwHttpErrors: false });

        gotStream.on('downloadProgress', (progress) => {
          console.log(progress);
        });

        gotStream.on('error', (err) => {
          console.log('出现错误:', err);
          rsv(false);
        });
        gotStream.on('end', () => {
          console.log('文件[' + fileName + ']下载完毕');
          setTimeout(() => {
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
          }, 1000);
        });
        pipeline(gotStream, zipStream);
      } catch (e) {
        console.log(e);
        rsv(false);
      }
    });
  }
}

const HotUpdateInstance = new HotUpdate();

export default HotUpdateInstance;
