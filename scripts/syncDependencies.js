import jsonfile from 'jsonfile';
import { resolve } from 'path';
import { builtinModules } from 'module';
import { ColorLog } from './colorLog.js';

const rootFile = resolve(process.cwd(), './package.json');
const appFile = resolve(process.cwd(), './release/app/package.json');
/**
 *
 * @param {string} buildDep
 * @returns {boolean}
 */
export const verifyDep = (buildDep) => {
  const reg = /(^(\.+|\/@|\/))|(\.[tj]s$)/;
  return !!(buildDep && builtinModules.indexOf(buildDep) < 0 && !reg.test(buildDep));
};
/**
 *拿到所有主进程和preload依赖的包
 * @param {Set} deps
 * @return {Promise<Object>}
 */
export const addDependencies = async (deps) => {
  const usedDependencies = {};
  const allDependencies = (await readJson(rootFile))['dependencies'];
  deps.forEach((dep) => {
    if (dep in allDependencies) {
      usedDependencies[[dep.toString()]] = allDependencies[dep];
    }
  });
  const appJson = await readJson(appFile);
  appJson['dependencies'] = usedDependencies;
  await writeJson(appFile, appJson);
  return usedDependencies;
};
/**
 *
 * @param {string} path
 * @returns {Promise<Object>}
 */
const readJson = async (path) => {
  return new Promise((resolve, reject) => {
    jsonfile.readFile(path, function (err, obj) {
      if (err) reject(err);
      resolve(obj);
    });
  });
};
/**
 *
 * @param {string} path
 * @param {Object} obj
 * @returns {Promise<boolean>}
 */
const writeJson = async (path, obj) => {
  try {
    await jsonfile.writeFile(path, obj);
    return true;
  } catch (e) {
    ColorLog.error(e);
    return false;
  }
};
