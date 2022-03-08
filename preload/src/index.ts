import { decodeHTML5 } from 'entities';
import { ipcRenderer, clipboard } from 'electron';
import type { NodeApiProps } from '../../common';
import * as os from 'os';

let type: NodeApiProps['OS'];
switch (os.platform()) {
  case 'darwin':
    type = 'mac';
    break;
  case 'win32':
    type = 'win';
    break;
  default:
    type = 'other';
    break;
}

const exposeThings: Omit<NodeApiProps, 'MessagePort'> = {
  NODE_ENV: process.env.NODE_ENV,
  ipc: ipcRenderer,
  Clipboard: clipboard,
  OS:type,
  decodeHTML5: decodeHTML5
};
Object.entries(exposeThings).forEach(([key, value]) => {
  window[key] = value;
});
