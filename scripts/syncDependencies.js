import jsonfile from 'jsonfile';
import { resolve } from 'path';
import { builtinModules } from 'module';
import { ColorLog } from './colorLog.js';
import { exec } from 'child_process';
import { readFile } from 'fs';

const rootFile = resolve(process.cwd(), './package.json');
const appFile = resolve(process.cwd(), './release/app/package.json');
const mainPath = resolve(process.cwd(),'release/app/dist/main/main.js');
const preloadPath = resolve(process.cwd(),'release/app/dist/preload/index.js');
const regexp1 = /require\("[a-zA-Z1-9/@_-]+"\)/gi;
const regexp2 = /\(([^)]*)\)/;

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

const formatJson = () => {
  try {
    exec(`prettier --write ${appFile}`);
  } catch (e) {
    ColorLog.error(e);
  }
};

const readFileContent = async (path) => {
  return new Promise((resolve, reject) => {
    readFile(path, 'utf8', function (err, data) {
      if (err) reject(err);
      resolve(data);
    });
  });
};

const getDependencies = async () => {
  const deps = new Set();
  const mainStr = await readFileContent(mainPath);
  const mainRes = mainStr.match(regexp1);
  for (const re of mainRes) {
    const dep = re.match(regexp2)[1].replace(/"/g,'');
    if (verifyDep(dep)) {
      deps.add(dep);
    }
  }
  const preloadStr = await readFileContent(preloadPath);
  const preloadRes = preloadStr.match(regexp1);
  for (const re of preloadRes) {
    const dep = re.match(regexp2)[1].replace(/"/g,'');
    if (verifyDep(dep)) {
      deps.add(dep);
    }
  }
  return deps;
};

/**
 * 拿到所有主进程和preload依赖的包
 * @return {Promise<Object>}
 */
export const syncDependencies = async () => {
  const deps =await getDependencies();
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
  formatJson();
  return usedDependencies;
};

