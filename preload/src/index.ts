import { decodeHTML5 } from 'entities';
import { ipcRenderer, clipboard } from 'electron';
import type { NodeApiProps } from '../../common';

const exposeThings: Omit<NodeApiProps, 'MessagePort'> = {
  NODE_ENV: process.env.NODE_ENV,
  ipc: ipcRenderer,
  Clipboard: clipboard,
  decodeHTML5: decodeHTML5
};
Object.entries(exposeThings).forEach(([key, value]) => {
  window[key] = value;
});
