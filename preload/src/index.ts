import { decodeHTML5 } from 'entities';
import { ipcRenderer } from 'electron';
import type { NodeApiProps } from '../../common';

console.log(ipcRenderer);
const exposeThings: NodeApiProps = {
  NODE_ENV: process.env.NODE_ENV,
  ipc: ipcRenderer,
  decodeHTML5: decodeHTML5
};
Object.entries(exposeThings).forEach(([key, value]) => {
  window[key] = value;
});
