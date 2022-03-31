import { resolve } from 'path';
import * as fs from 'fs';

//服务器地址
const server = process.argv[2] ?? '无服务器';

const evPath = resolve(process.cwd(), './prod.env');
(async () => {
  try {
    const preStr = fs.readFileSync(evPath).toString();
    const lastStr = preStr.replace('$UPDATE_SERVER_URL', server);
    console.log(lastStr);
    fs.writeFileSync(evPath, lastStr);
  } catch (e) {
    console.log('更新服务器配置失败', e);
  }
})();
