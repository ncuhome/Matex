import { resolve } from 'path';
import {formatJson, readJson, writeJson} from './util.js';
import {ColorLog} from "./colorLog.js";

const rootFile = resolve(process.cwd(), './package.json');
const appFile = resolve(process.cwd(), './release/app/package.json');


/**
 * 拿到所有主进程和preload依赖的包
 * @param  deps {Set}
 * @return {Promise<Object>}
 */
export const syncDependencies = async (deps) => {
  const usedDependencies = {};
  const allDependencies = (await readJson(rootFile))['dependencies'];
  deps.forEach((dep) => {
    if (dep in allDependencies) {
      usedDependencies[dep.toString()] = allDependencies[dep];
    }
  });
  const appJson = await readJson(appFile);
  appJson['dependencies'] = usedDependencies;
  await writeJson(appFile, appJson);
  await formatJson(appFile);
  console.log('\n')
  ColorLog.success('依赖同步成功 √');
  return usedDependencies;
};

