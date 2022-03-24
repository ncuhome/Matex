import { EventEmitter } from 'events';
import { app, dialog } from 'electron';
import matexHttp from 'matexhttp';
import { promisify } from 'util';
import AdmZip from 'adm-zip';
import { resolve } from 'path';
import fs from 'fs';
import stream from 'stream';
import got from 'got';
import { AfterCheckRes, MetaData } from '../type/update';
import { Update_Channel } from '../../../common/ipc/channel';
import { getOsType } from '../utils/system';

const ReqAsync = promisify(matexHttp);
const pipeline = promisify(stream.pipeline);

const dirPath = resolve(__dirname, '../../');
let fileName = 'app.zip';
const targetPath = resolve(dirPath, fileName);
const macUrl = 'http://159.75.220.253:7888/assets/mac/mac.zip';
const winUrl = 'http://159.75.220.253:7888/assets/win/win.zip';

class HotUpdate extends EventEmitter {
  constructor() {
    super();
  }
  async checkUpdate() {
    console.log('开始检查更新');
    const os = getOsType();
    const res = await ReqAsync({
      url: 'http://159.75.220.253:7888/update/check?os=' + os,
      method: 'GET'
    });
    const resData = JSON.parse(res.strBody as string);
    console.log(resData);
    const metadata = resData.data as MetaData;
    if (resData.code === 200) {
      const res = {
        isUpdate: true,
        version: metadata.version,
        size: metadata.size,
        os: metadata.os,
        update_time: metadata.update_time
      };
      if (metadata.version !== app.getVersion()) {
        this.emit(Update_Channel.AfterCheck, res as AfterCheckRes);
      } else {
        this.emit(Update_Channel.AfterCheck, res as AfterCheckRes);
        console.log('没有更新');
      }
    } else {
      dialog.showErrorBox('提示', '获取更新信息失败');
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
          dialog.showErrorBox('下载失败', '不支持的操作系统');
          rsv(false);
        }
        let gotReq: any = null;
        const gotStream = got.stream(url, { throwHttpErrors: false });
        gotStream.on('request', (req) => {
          gotReq = req;
        });
        this.on(Update_Channel.CancelUpdate, () => {
          console.log('取消更新');
          if (gotReq) {
            gotReq.abort();
            gotReq = null;
            this.emit(Update_Channel.UpdateCanceled);
          }
        });

        process.on('uncaughtException', (err) => {
          console.log('uncaughtException:=' + err);
        });

        process.on('unhandledRejection', (err) => {
          console.log('unhandledRejection:=' + err);
        });

        process.on('uncaughtExceptionMonitor', (err) => {
          console.log('uncaughtExceptionMonitor:=' + err);
        });

        gotStream.on('downloadProgress', (progress) => {
          console.log(progress);
          this.emit(Update_Channel.DownloadProgress, progress);
        });

        gotStream.on('error', (err) => {
          console.log('出现错误:', err);
          dialog.showErrorBox('更新失败', '出现错误' + err);
          rsv(false);
        });
        gotStream.on('end', () => {
          console.log('文件[' + fileName + ']下载完毕');
        });

        pipeline(gotStream, zipStream).then(() => {
          console.log('pipeline end');
          this.emit(Update_Channel.UpdateDownloaded, null);
          rsv(true);
        });
      } catch (e) {
        dialog.showErrorBox('下载失败', '出现错误' + e);
        console.log(e);
        rsv(false);
      }
    });
  }

  extractZip(): Promise<boolean> {
    return new Promise((rsv) => {
      try {
        //防止解压错误
        setTimeout(() => {
          const admZip = new AdmZip(targetPath);
          admZip.extractAllTo(resolve(dirPath, './'), true);
          console.log('文件[' + fileName + ']解压完毕');
          fs.unlinkSync(targetPath);
          rsv(true);
        }, 500);
      } catch (e) {
        console.log(e);
        dialog.showErrorBox('解压失败', '出现错误' + e);
        rsv(false);
      }
    });
  }
}

const HotUpdateInstance = new HotUpdate();

export default HotUpdateInstance;
