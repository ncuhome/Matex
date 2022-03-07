import { EventEmitter } from 'events';
import {app, dialog} from 'electron';
import matexHttp from 'matexhttp';
import {promisify} from 'util';
import AdmZip from 'adm-zip';
import path from 'path';
import fs from 'fs';

const ReqAsync = promisify(matexHttp);
class HotUpdate extends EventEmitter{
  oldVer: string;
  latestVer: string | undefined;
  constructor() {
    super();
    this.oldVer = app.getVersion();
  }

  async checkUpdate() {
    console.log('checkUpdate');
    const res = await ReqAsync({
      url: 'http://localhost:8080/update?version=' + app.getVersion(),
      method: 'GET'
    });
    const data = JSON.parse(res.strBody as string);
    if (data.status === '1'){
      this.emit('after-check',true);
      this.latestVer = data.version;
      const res = await this.downFile();
      if (res){
        app.relaunch();
        app.exit(0);
      } else {
        dialog.showMessageBox({
          type: 'error',
          title: '提示',
          message: '更新失败',
          buttons: ['确定']
        });
      }
    } else {
      this.emit('after-check',false);
      console.log('没有更新');
    }
  }

  async downFile(){
    return new Promise((resolve) => {
      try {
        const dirPath = path.join(__dirname, '../');
        if (!fs.existsSync(dirPath)) {
          fs.mkdirSync(dirPath);
          console.log('文件夹创建成功');
        } else {
          console.log('文件夹已存在');
        }
        let fileName = 'app.zip' ;
        let url = 'http://localhost:8080/' + fileName;
        let stream = fs.createWriteStream(path.join(dirPath, fileName));
        matexHttp(url).pipe(stream).on('close', function (err: any) {
          if (err) {
            console.log(err);
            resolve(false);
          } else {
            console.log('文件[' + fileName + ']下载完毕');
            const admZip = new AdmZip(path.join(dirPath, fileName));
            admZip.extractAllTo(path.join(dirPath, './'),true);
            fs.unlinkSync(path.join(dirPath, fileName));
            resolve(true);
          }
        });
      } catch (e) {
        console.log(e);
        resolve(false);
      }

    });

  }
}

const HotUpdateInstance = new HotUpdate();

export default HotUpdateInstance;
