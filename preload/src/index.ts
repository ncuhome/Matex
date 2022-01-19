/**
 * @module preload
 */

// import {contextBridge} from 'electron';
// import {sha256sum} from './sha256sum';
//
// /**
//  * The "Main World" is the JavaScript context that your main renderer code runs in.
//  * By default, the page you load in your renderer executes code in this world.
//  *
//  * @see https://www.electronjs.org/docs/api/context-bridge
//  */
//
// /**
//  * After analyzing the `exposeInMainWorld` calls,
//  * `packages/preload/exposedInMainWorld.d.ts` file will be generated.
//  * It contains all interfaces.
//  * `packages/preload/exposedInMainWorld.d.ts` file is required for TS is `renderer`
//  *
//  * @see https://github.com/cawa-93/dts-for-context-bridge
//  */
//
// /**
//  * Expose Environment versions.
//  * @example
//  * console.log( window.versions )
//  */
// contextBridge.exposeInMainWorld('versions', process.versions);
//
// /**
//  * Safe expose node.js API
//  * @example
//  * window.nodeCrypto('data')
//  */
// contextBridge.exposeInMainWorld('nodeCrypto', {sha256sum});

window.addEventListener('DOMContentLoaded', () => {
  const inject = () => {
    const { ipcRenderer } = require('electron');
    // @ts-ignore
    window.ipc = ipcRenderer;
    injectAxios();
    injectDecode();
  };

  for (const type of ['chrome', 'node', 'electron']) {
    inject();
  }
});

const injectAxios = () => {
  const axios = require('axios');
  const signale = require('signale');
  axios.interceptors.request.use(
    (config: any) => {
      signale.debug(config);
      return config;
    },
    (error: any) => Promise.reject(error)
  );
  // @ts-ignore
  window.Mixos = axios;
};

const injectDecode = () => {
  const entities = require('entities');

  // @ts-ignore
  window.decodeHTML5 = entities.decodeHTML5;
};

