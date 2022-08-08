import {ColorLog} from "./colorLog.js";
import jsonfile from 'jsonfile';
import { exec } from 'child_process';
import 'dayjs/locale/zh-cn.js'; // 导入本地化语言
import dayjs from 'dayjs';
import isLeapYear from 'dayjs/plugin/isLeapYear.js'; // 导入插件

dayjs.extend(isLeapYear); // 使用插件
dayjs.locale('zh-cn');

export const matexTime = dayjs;


/**
 *
 * @param server {import('vite').ViteDevServer}
 * @returns {string}
 */
export const getDevPath = (server)=>{
	const protocol = `http${server.config.server.https ? 's' : ''}:`;
	const host = server.config.server.host || 'localhost';
	const port = server.config.server.port;
	const path = '/';
	return `${protocol}//${host}:${port}${path}`;
}

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

