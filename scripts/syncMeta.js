import {resolve} from 'path';
import {ColorLog} from './colorLog.js';
import dayjs from 'dayjs';
import {formatJson, readJson, writeJson} from './utils.js';


const rootFile = resolve(process.cwd(), './package.json');
const metaFile = resolve(process.cwd(), './meta.json');

(async ()=>{
  try {
    const pkgInfo = await readJson(rootFile);
    const name = pkgInfo['name'];
    const version = pkgInfo['version'];
    const time = dayjs().format('YYYY-MM-DD HH:mm:ss');
    const metaObj = {
      name,
      version,
      time
    };
    await writeJson(metaFile, metaObj);
    console.log(metaFile);
    await formatJson(metaFile);
    ColorLog.success('同步元信息成功');
  }catch (e) {
    ColorLog.error(e);
  }
})();
