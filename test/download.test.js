import { resolve } from 'path';
import { promisify } from 'node:util';
import stream from 'node:stream';
import fs from 'node:fs';
import got from 'got';
import AdmZip from 'adm-zip';
const pipeline = promisify(stream.pipeline);
import pkg from 'bluebird';
const { Promise } = pkg;
Promise.config({ cancellation: true });

const downFile = () => {
  return new Promise((rsv, reject, onCancel) => {
    try {
      const dirPath = resolve(process.cwd(), './');
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
        console.log('文件夹创建成功');
      }
      let fileName = 'app.zip';
      let url = 'http://159.75.220.253:7888/assets/mac/mac.zip';
      const targetPath = resolve(dirPath, fileName);
      let zipStream = fs.createWriteStream(targetPath);

      const gotStream = got.stream(url, { throwHttpErrors: false });
      let request;
      gotStream.on('request', (req) => {
        console.log(req);
        request = req;
      });

      onCancel(() => {
        console.log('cancel');
        request.abort();
      });

      gotStream.on('downloadProgress', (progress) => {
        console.log(progress);
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

      gotStream.on('error', (err) => {
        console.log('错误:', err);
        reject(err);
      });
      gotStream.on('end', () => {
        console.log('文件[' + fileName + ']下载完毕');
        setTimeout(() => {
          try {
            const admZip = new AdmZip(targetPath);
            admZip.extractAllTo(resolve(dirPath, './zip'), true);
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
};

(async () => {
  try {
    const result = downFile();
    // setTimeout(() => {
    //   result.cancel();
    // }, 2000);
    console.log(result);
  } catch (e) {
    console.log('错误:1234', e);
    console.log(e);
  }
})();
