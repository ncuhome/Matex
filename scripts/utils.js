import jsonfile from 'jsonfile';
import {ColorLog} from './colorLog.js';
import {exec} from 'child_process';


/**
 *
 * @param {string} path
 * @returns {Promise<Object>}
 */
export const readJson = async (path) => {
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
export const writeJson = async (path, obj) => {
  try {
    await jsonfile.writeFile(path, obj);
    return true;
  } catch (e) {
    ColorLog.error(e);
    return false;
  }
};
/**
 *
 * @param {string} path
 * @returns {Promise<Object>}
 */
export const formatJson = (path) => {
  try {
    exec(`prettier --write ${path}`);
  } catch (e) {
    ColorLog.error(e);
  }
};
